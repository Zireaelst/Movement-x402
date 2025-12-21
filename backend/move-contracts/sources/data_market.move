/// AI Data Buffet - Data Marketplace Module
/// 
/// This module enables a decentralized marketplace for AI training data,
/// allowing data providers to list datasets and consumers to purchase access.
module data_market::data_market {
    use std::signer;
    use std::string::String;
    use std::vector;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::event;
    use aptos_framework::timestamp;
    use aptos_framework::account;

    // ==================== Error Codes ====================
    
    /// Error when trying to access non-existent data item
    const E_DATA_ITEM_NOT_FOUND: u64 = 1;
    /// Error when buyer has insufficient funds
    const E_INSUFFICIENT_FUNDS: u64 = 2;
    /// Error when user already has access to the data
    const E_ALREADY_HAS_ACCESS: u64 = 3;
    /// Error when marketplace is not initialized
    const E_MARKETPLACE_NOT_INITIALIZED: u64 = 4;
    /// Error when data item is not active
    const E_DATA_ITEM_NOT_ACTIVE: u64 = 5;
    /// Error when caller is not the owner
    const E_NOT_OWNER: u64 = 6;
    /// Error when data ID already exists
    const E_DATA_ID_EXISTS: u64 = 7;

    // ==================== Structs ====================

    /// Represents a single data item/dataset in the marketplace
    struct DataItem has store, drop, copy {
        /// Unique identifier for the data item
        id: u64,
        /// Price in MOVE tokens (in Octas - 1 MOVE = 10^8 Octas)
        price: u64,
        /// Address of the data owner/provider
        owner: address,
        /// Name/title of the dataset
        name: String,
        /// Description of the dataset
        description: String,
        /// Category (e.g., "images", "text", "audio", "video")
        category: String,
        /// IPFS hash or URI to access the data (revealed after purchase)
        data_uri: String,
        /// Timestamp when the item was listed
        created_at: u64,
        /// Whether the item is currently active for sale
        is_active: bool,
        /// Total number of purchases
        purchase_count: u64,
    }

    /// Tracks which users have access to which data items
    struct AccessRecord has store, drop, copy {
        data_id: u64,
        buyer: address,
        purchased_at: u64,
    }

    /// Global marketplace state - stored at module publisher's address
    struct Marketplace has key {
        /// All data items listed in the marketplace
        data_items: vector<DataItem>,
        /// All access records (who bought what)
        access_records: vector<AccessRecord>,
        /// Counter for generating unique data IDs
        next_data_id: u64,
        /// Total volume traded (in Octas)
        total_volume: u64,
        /// Platform fee percentage (basis points, e.g., 250 = 2.5%)
        platform_fee_bps: u64,
        /// Address that receives platform fees
        fee_recipient: address,
    }

    // ==================== Events ====================

    #[event]
    /// Emitted when a new data item is listed
    struct DataListed has drop, store {
        data_id: u64,
        owner: address,
        price: u64,
        name: String,
        category: String,
        timestamp: u64,
    }

    #[event]
    /// Emitted when a data item is purchased
    struct DataPurchased has drop, store {
        data_id: u64,
        buyer: address,
        seller: address,
        price: u64,
        platform_fee: u64,
        timestamp: u64,
    }

    #[event]
    /// Emitted when a data item is updated
    struct DataUpdated has drop, store {
        data_id: u64,
        owner: address,
        new_price: u64,
        is_active: bool,
        timestamp: u64,
    }

    #[event]
    /// Emitted when a data item is delisted
    struct DataDelisted has drop, store {
        data_id: u64,
        owner: address,
        timestamp: u64,
    }

    // ==================== Initialization ====================

    /// Initialize the marketplace - called once by the module publisher
    public entry fun initialize_marketplace(
        admin: &signer,
        platform_fee_bps: u64,
        fee_recipient: address
    ) {
        let admin_addr = signer::address_of(admin);
        
        // Ensure marketplace doesn't already exist
        assert!(!exists<Marketplace>(admin_addr), E_MARKETPLACE_NOT_INITIALIZED);
        
        let marketplace = Marketplace {
            data_items: vector::empty<DataItem>(),
            access_records: vector::empty<AccessRecord>(),
            next_data_id: 1,
            total_volume: 0,
            platform_fee_bps,
            fee_recipient,
        };
        
        move_to(admin, marketplace);
    }

    // ==================== Core Functions ====================

    /// List a new data item for sale
    public entry fun list_data_item(
        seller: &signer,
        marketplace_addr: address,
        name: String,
        description: String,
        category: String,
        data_uri: String,
        price: u64,
    ) acquires Marketplace {
        let seller_addr = signer::address_of(seller);
        let marketplace = borrow_global_mut<Marketplace>(marketplace_addr);
        
        let data_id = marketplace.next_data_id;
        marketplace.next_data_id = data_id + 1;
        
        let current_time = timestamp::now_seconds();
        
        let data_item = DataItem {
            id: data_id,
            price,
            owner: seller_addr,
            name,
            description,
            category,
            data_uri,
            created_at: current_time,
            is_active: true,
            purchase_count: 0,
        };
        
        vector::push_back(&mut marketplace.data_items, data_item);
        
        // Emit event
        event::emit(DataListed {
            data_id,
            owner: seller_addr,
            price,
            name,
            category,
            timestamp: current_time,
        });
    }

    /// Purchase access to a data item
    public entry fun purchase_access(
        buyer: &signer,
        marketplace_addr: address,
        data_id: u64
    ) acquires Marketplace {
        let buyer_addr = signer::address_of(buyer);
        let marketplace = borrow_global_mut<Marketplace>(marketplace_addr);
        
        // Find the data item
        let data_item_idx = find_data_item_index(&marketplace.data_items, data_id);
        assert!(data_item_idx < vector::length(&marketplace.data_items), E_DATA_ITEM_NOT_FOUND);
        
        let data_item = vector::borrow_mut(&mut marketplace.data_items, data_item_idx);
        assert!(data_item.is_active, E_DATA_ITEM_NOT_ACTIVE);
        
        // Check buyer doesn't already have access
        assert!(!has_access_internal(&marketplace.access_records, buyer_addr, data_id), E_ALREADY_HAS_ACCESS);
        
        let price = data_item.price;
        let seller = data_item.owner;
        
        // Calculate platform fee
        let platform_fee = (price * marketplace.platform_fee_bps) / 10000;
        let seller_amount = price - platform_fee;
        
        // Transfer tokens: buyer -> seller (minus fee)
        coin::transfer<AptosCoin>(buyer, seller, seller_amount);
        
        // Transfer platform fee to fee recipient
        if (platform_fee > 0) {
            coin::transfer<AptosCoin>(buyer, marketplace.fee_recipient, platform_fee);
        };
        
        // Update marketplace stats
        marketplace.total_volume = marketplace.total_volume + price;
        data_item.purchase_count = data_item.purchase_count + 1;
        
        // Record access
        let current_time = timestamp::now_seconds();
        let access_record = AccessRecord {
            data_id,
            buyer: buyer_addr,
            purchased_at: current_time,
        };
        vector::push_back(&mut marketplace.access_records, access_record);
        
        // Emit purchase event
        event::emit(DataPurchased {
            data_id,
            buyer: buyer_addr,
            seller,
            price,
            platform_fee,
            timestamp: current_time,
        });
    }

    /// Update a data item's price or active status (owner only)
    public entry fun update_data_item(
        owner: &signer,
        marketplace_addr: address,
        data_id: u64,
        new_price: u64,
        is_active: bool
    ) acquires Marketplace {
        let owner_addr = signer::address_of(owner);
        let marketplace = borrow_global_mut<Marketplace>(marketplace_addr);
        
        let data_item_idx = find_data_item_index(&marketplace.data_items, data_id);
        assert!(data_item_idx < vector::length(&marketplace.data_items), E_DATA_ITEM_NOT_FOUND);
        
        let data_item = vector::borrow_mut(&mut marketplace.data_items, data_item_idx);
        assert!(data_item.owner == owner_addr, E_NOT_OWNER);
        
        data_item.price = new_price;
        data_item.is_active = is_active;
        
        event::emit(DataUpdated {
            data_id,
            owner: owner_addr,
            new_price,
            is_active,
            timestamp: timestamp::now_seconds(),
        });
    }

    /// Delist a data item (owner only)
    public entry fun delist_data_item(
        owner: &signer,
        marketplace_addr: address,
        data_id: u64
    ) acquires Marketplace {
        let owner_addr = signer::address_of(owner);
        let marketplace = borrow_global_mut<Marketplace>(marketplace_addr);
        
        let data_item_idx = find_data_item_index(&marketplace.data_items, data_id);
        assert!(data_item_idx < vector::length(&marketplace.data_items), E_DATA_ITEM_NOT_FOUND);
        
        let data_item = vector::borrow_mut(&mut marketplace.data_items, data_item_idx);
        assert!(data_item.owner == owner_addr, E_NOT_OWNER);
        
        data_item.is_active = false;
        
        event::emit(DataDelisted {
            data_id,
            owner: owner_addr,
            timestamp: timestamp::now_seconds(),
        });
    }

    // ==================== View Functions ====================

    #[view]
    /// Check if a user has access to a specific data item
    public fun has_access(
        marketplace_addr: address,
        user: address,
        data_id: u64
    ): bool acquires Marketplace {
        let marketplace = borrow_global<Marketplace>(marketplace_addr);
        has_access_internal(&marketplace.access_records, user, data_id)
    }

    #[view]
    /// Get data item details (returns price, owner, name, category, is_active, purchase_count)
    public fun get_data_item(
        marketplace_addr: address,
        data_id: u64
    ): (u64, address, String, String, bool, u64) acquires Marketplace {
        let marketplace = borrow_global<Marketplace>(marketplace_addr);
        let data_item_idx = find_data_item_index(&marketplace.data_items, data_id);
        assert!(data_item_idx < vector::length(&marketplace.data_items), E_DATA_ITEM_NOT_FOUND);
        
        let data_item = vector::borrow(&marketplace.data_items, data_item_idx);
        (
            data_item.price,
            data_item.owner,
            data_item.name,
            data_item.category,
            data_item.is_active,
            data_item.purchase_count
        )
    }

    #[view]
    /// Get the data URI (only callable after verifying access off-chain)
    public fun get_data_uri(
        marketplace_addr: address,
        data_id: u64
    ): String acquires Marketplace {
        let marketplace = borrow_global<Marketplace>(marketplace_addr);
        let data_item_idx = find_data_item_index(&marketplace.data_items, data_id);
        assert!(data_item_idx < vector::length(&marketplace.data_items), E_DATA_ITEM_NOT_FOUND);
        
        let data_item = vector::borrow(&marketplace.data_items, data_item_idx);
        data_item.data_uri
    }

    #[view]
    /// Get marketplace statistics
    public fun get_marketplace_stats(
        marketplace_addr: address
    ): (u64, u64, u64) acquires Marketplace {
        let marketplace = borrow_global<Marketplace>(marketplace_addr);
        (
            vector::length(&marketplace.data_items),
            marketplace.total_volume,
            marketplace.platform_fee_bps
        )
    }

    #[view]
    /// Get total number of data items
    public fun get_data_item_count(marketplace_addr: address): u64 acquires Marketplace {
        let marketplace = borrow_global<Marketplace>(marketplace_addr);
        vector::length(&marketplace.data_items)
    }

    // ==================== Internal Helper Functions ====================

    /// Find the index of a data item by ID
    fun find_data_item_index(data_items: &vector<DataItem>, data_id: u64): u64 {
        let len = vector::length(data_items);
        let i = 0;
        while (i < len) {
            let item = vector::borrow(data_items, i);
            if (item.id == data_id) {
                return i
            };
            i = i + 1;
        };
        len // Return length to indicate not found
    }

    /// Internal function to check access
    fun has_access_internal(
        access_records: &vector<AccessRecord>,
        user: address,
        data_id: u64
    ): bool {
        let len = vector::length(access_records);
        let i = 0;
        while (i < len) {
            let record = vector::borrow(access_records, i);
            if (record.buyer == user && record.data_id == data_id) {
                return true
            };
            i = i + 1;
        };
        false
    }

    // ==================== Test Functions ====================

    #[test_only]
    public fun init_for_test(admin: &signer) {
        initialize_marketplace(admin, 250, signer::address_of(admin));
    }
}
