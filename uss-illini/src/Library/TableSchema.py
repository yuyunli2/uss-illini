'''
Table Schema in MySQL

Main Methods:
    {} = TABLES
'''
TABLES = {}
TABLES['random_ships_stats'] = ("""CREATE TABLE IF NOT EXISTS random_ships_stats(
        wins INTEGER,
        draws INTEGER,
        losses INTEGER,
        battles INTEGER,
        survived_wins INTEGER,
        survived_battles INTEGER,
        xp INTEGER,
        max_xp INTEGER,
        frags INTEGER,
        max_frags_battle INTEGER,
        damage_scouting INTEGER,
        max_damage_scouting INTEGER,
        damage_dealt INTEGER,
        max_damage_dealt INTEGER,
        ships_spotted INTEGER,
        max_ships_spotted INTEGER,
        team_capture_points INTEGER,
        capture_points INTEGER,
        dropped_capture_points INTEGER,
        team_dropped_capture_points INTEGER,
        planes_killed INTEGER,
        max_planes_killed INTEGER,
        last_battle_time INTEGER,
        distance INTEGER,
        updated_at INTEGER,
        private INTEGER,
        damage_to_buildings INTEGER,
        max_damage_dealt_to_buildings INTEGER,
        suppressions_count INTEGER,
        max_suppressions_count INTEGER,
        art_agro INTEGER,
        torpedo_agro INTEGER,
        max_total_agro INTEGER,
        battles_total INTEGER,
        battles_since_510 INTEGER,
        battles_since_512 INTEGER,
        ship_id INTEGER,
        account_id INTEGER,
        main_battery_max_frags_battle INTEGER,
        main_battery_frags INTEGER,
        main_battery_hits INTEGER,
        main_battery_shots INTEGER,
        second_battery_max_frags_battle INTEGER,
        second_battery_frags INTEGER,
        second_battery_hits INTEGER,
        second_battery_shots INTEGER,
        ramming_max_frags_battle INTEGER,
        ramming_frags INTEGER,
        torpedoes_max_frags_battle INTEGER,
        torpedoes_frags INTEGER,
        torpedoes_hits INTEGER,
        torpedoes_shots INTEGER,
        aircraft_max_frags_battle INTEGER,
        aircraft_frags INTEGER,
        KEY(ship_id,account_id)
        );""")

TABLES['modules'] = ("""CREATE TABLE IF NOT EXISTS modules(
        name VARCHAR(50),
        type VARCHAR(50),
        type_name VARCHAR(50),
        image TEXT,
        tag VARCHAR(50),
        module_id_str VARCHAR(50),
        module_id INTEGER,
        price_credit INTEGER,
        profile JSON,
        KEY(module_id)
        );""")

TABLES['ships'] = ("""CREATE TABLE IF NOT EXISTS ships(
        name VARCHAR(50),
        tier INTEGER,
        type VARCHAR(50),
        nation VARCHAR(50),
        price_credit INTEGER,
        price_gold INTEGER,
        ship_id_str VARCHAR(50),
        ship_id INTEGER,
        is_premium BOOLEAN,
        is_special BOOLEAN,
        description TEXT,
        mod_slots INTEGER,
        next_ships JSON,
        upgrades JSON,
        default_profile_engine JSON,
        default_profile_torpedo_bomber JSON,
        default_profile_anti_aircraft JSON,
        default_profile_mobility JSON,
        default_profile_hull JSON,
        default_profile_atbas JSON,
        default_profile_artillery JSON,
        default_profile_torpedoes JSON,
        default_profile_fighters JSON,
        default_profile_fire_control JSON,
        default_profile_weaponry JSON,
        default_profile_battle_level_range_max INTEGER,
        default_profile_battle_level_range_min INTEGER,
        default_profile_flight_control JSON,
        default_profile_concealment JSON,
        default_profile_armour JSON,
        default_profile_dive_bomber JSON,
        images_small TEXT,
        images_medium TEXT,
        images_large TEXT,
        images_contour TEXT,
        modules_engine JSON,
        modules_torpedo_bomber JSON,
        modules_fighter JSON,
        modules_hull JSON,
        modules_artillery JSON,
        modules_torpedoes JSON,
        modules_fire_control JSON,
        modules_flight_control JSON,
        modules_dive_bomber JSON,
        modules_tree JSON,
        KEY (ship_id)
);""")

TABLES['clans'] = ("""CREATE TABLE IF NOT EXISTS clan(
        tag VARCHAR(50) UNIQUE,
        name VARCHAR(50) UNIQUE,
        members_count INTEGER,
        leader_id INTEGER,
        leader_name VARCHAR(50),
        creator_name VARCHAR(50),
        description TEXT,
        old_name VARCHAR(50),
        old_tag VARCHAR(50),
        renamed_at INTEGER,
        clan_id INTEGER,
        created_at INTEGER,
        updated_at INTEGER,
        is_clan_disbanded BOOLEAN,
        members_ids JSON,
        KEY (clan_id)
);""")

TABLES['account_stats'] = ("""CREATE TABLE IF NOT EXISTS account_stats(
        nickname VARCHAR(50) UNIQUE,
        account_id INTEGER,
        wins INTEGER,
        draws INTEGER,
        losses INTEGER,
        battles INTEGER,
        battles_total INTEGER,
        survived_wins INTEGER,
        survived_battles INTEGER,
        xp INTEGER,
        max_xp INTEGER,
        frags INTEGER,
        max_frags_battle INTEGER,
        damage_scouting INTEGER,
        max_damage_scouting INTEGER,
        damage_dealt INTEGER,
        max_damage_dealt INTEGER,
        ships_spotted INTEGER,
        max_ships_spotted INTEGER,
        team_capture_points INTEGER,
        capture_points INTEGER,
        dropped_capture_points INTEGER,
        team_dropped_capture_points INTEGER,
        planes_killed INTEGER,
        max_planes_killed INTEGER,
        distance INTEGER,
        leveling_tier INTEGER,
        leveling_points INTEGER,
        private INTEGER,
        hidden_profile BOOLEAN,
        karma INTEGER,
        damage_to_buildings INTEGER,
        max_damage_dealt_to_buildings INTEGER,
        suppressions_count INTEGER,
        max_suppressions_count INTEGER,
        art_agro INTEGER,
        torpedo_agro INTEGER,
        max_total_agro INTEGER,
        last_battle_time INTEGER,
        logout_at INTEGER,
        created_at INTEGER,
        updated_at INTEGER,
        stats_updated_at INTEGER,
        battles_since_510 INTEGER,
        battles_since_512 INTEGER,
        main_battery_max_frags_battle INTEGER,
        main_battery_frags INTEGER,
        main_battery_hits INTEGER,
        main_battery_shots INTEGER,
        second_battery_max_frags_battle INTEGER,
        second_battery_frags INTEGER,
        second_battery_hits INTEGER,
        second_battery_shots INTEGER,
        ramming_max_frags_battle INTEGER,
        ramming_frags INTEGER,
        torpedoes_max_frags_battle INTEGER,
        torpedoes_frags INTEGER,
        torpedoes_hits INTEGER,
        torpedoes_shots INTEGER,
        aircraft_max_frags_battle INTEGER,
        aircraft_frags INTEGER,
        clan_id INTEGER UNIQUE,
        account_id_clan INTEGER,
        account_name VARCHAR(50),
        role VARCHAR(50),
        joined_at INTEGER,
        KEY (account_id)
);""")

TABLES['rank_ship_stats'] = ("""CREATE TABLE IF NOT EXISTS rank_ship_stats(
        season INTEGER,
        ship_id INTEGER,
        wins INTEGER,
        draws INTEGER,
        losses INTEGER,
        battles INTEGER,
        survived_wins INTEGER,
        survived_battles INTEGER,
        xp INTEGER,
        max_xp INTEGER,
        frags INTEGER,
        max_frags_battle INTEGER,
        damage_dealt INTEGER,
        max_damage_dealt INTEGER,
        max_planes_killed INTEGER,
        main_battery_max_frags_battle INTEGER,
        main_battery_frags INTEGER,
        main_battery_hits INTEGER,
        main_battery_shots INTEGER,
        second_battery_max_frags_battle INTEGER,
        second_battery_frags INTEGER,
        second_battery_hits INTEGER,
        second_battery_shots INTEGER,
        ramming_max_frags_battle INTEGER,
        ramming_frags INTEGER,
        torpedoes_max_frags_battle INTEGER,
        torpedoes_frags INTEGER,
        torpedoes_hits INTEGER,
        torpedoes_shots INTEGER,
        aircraft_max_frags_battle INTEGER,
        aircraft_frags INTEGER,
        account_id INTEGER,
        KEY (account_id,ship_id,season)
);""")

TABLES['rank_account_stats'] = ("""CREATE TABLE IF NOT EXISTS rank_account_stats(
        season INTEGER,
        max_rank INTEGER,
        start_rank INTEGER,
        stars INTEGER,
        rank INTEGER,
        stage INTEGER,
        wins INTEGER,
        draws INTEGER,
        losses INTEGER,
        battles INTEGER,
        survived_wins INTEGER,
        survived_battles INTEGER,
        xp INTEGER,
        max_xp INTEGER,
        frags INTEGER,
        max_frags_battle INTEGER,
        damage_dealt INTEGER,
        max_damage_dealt INTEGER,
        max_planes_killed INTEGER,
        main_battery_max_frags_battle INTEGER,
        main_battery_frags INTEGER,
        main_battery_hits INTEGER,
        main_battery_shots INTEGER,
        second_battery_max_frags_battle INTEGER,
        second_battery_frags INTEGER,
        second_battery_hits INTEGER,
        second_battery_shots INTEGER,
        ramming_max_frags_battle INTEGER,
        ramming_frags INTEGER,
        torpedoes_max_frags_battle INTEGER,
        torpedoes_frags INTEGER,
        torpedoes_hits INTEGER,
        torpedoes_shots INTEGER,
        aircraft_max_frags_battle INTEGER,
        aircraft_frags INTEGER,
        account_id INTEGER,
        KEY (account_id,season)
);""")
