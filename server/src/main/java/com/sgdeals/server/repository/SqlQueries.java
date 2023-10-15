package com.sgdeals.server.repository;

public class SqlQueries {
    
    public static final String SAVE_DEALS = "INSERT INTO deals (uuid, valid, category) VALUES (?,?,?);";
    public static final String SAVE_DEAL_DETAILS = """
                    INSERT INTO deal_details (
                        deal_id, 
                        name, 
                        description,
                        image_url,
                        website_url,
                        terms_conditions,
                        tags,
                        valid_start_date,
                        valid_end_date,
                        venue,
                        latitude,
                        longitude
                        ) VALUES (
                        ?,?,?,?,?,?,?,?,?,?,?,?
                        )
                    """;            
    public static final String GET_DEALS_BY_CATEGORY = """
                        SELECT deal_id, 
                                name, 
                                description, 
                                image_url, 
                                website_url, 
                                terms_conditions, 
                                tags,
                                valid_start_date, 
                                valid_end_date, 
                                venue, 
                                latitude, 
                                longitude
                        FROM deals
                        JOIN deal_details
                        ON deals.uuid = deal_details.deal_id
                        WHERE category = (?)
                        AND valid = true;
                    """;

    public static final String GET_DEALS_BY_KEYWORD = """
                SELECT deal_id, 
                        name, 
                        description, 
                        image_url, 
                        website_url, 
                        terms_conditions, 
                        tags,
                        valid_start_date, 
                        valid_end_date, 
                        venue, 
                        latitude, 
                        longitude
                FROM deals
                JOIN deal_details
                ON deals.uuid = deal_details.deal_id
                WHERE
                    NAME LIKE CONCAT('%', ?, '%')
                OR
                    DESCRIPTION LIKE CONCAT('%', ?, '%')
                OR
                    TAGS LIKE CONCAT ('%', ?, '%')
                AND
                    valid = true;
             """;
    public static final String GET_UUIDS = "SELECT UUID FROM deals;";


    public static final String UPDATE_VALID_STATUS = """
        UPDATE deals 
        SET valid = FALSE 
        WHERE UUID IN 
            (select deal_id from deal_details where valid_end_date <= NOW());
            """;
    
    public static final String USER_EXIST = "SELECT count(*) FROM users WHERE EMAIL = ?;";

    public static final String CREATE_USER = """
        INSERT INTO users (
            email,
            password,
            first_name,
            last_name,
            dob,
            receive_update
        )
        VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        );
            """;

    public static final String SAVE_USER_DEALS = "INSERT INTO user_deals (email, deal_id) VALUES (?, ?);";

    public static final String GET_USER_DEALS = """
                SELECT 
                    deal_id, 
                    name, 
                    description, 
                    image_url, 
                    website_url, 
                    terms_conditions, 
                    tags,
                    valid_start_date, 
                    valid_end_date, 
                    venue, 
                    latitude, 
                    longitude
                FROM
                    deal_details
                WHERE
                    deal_id
                IN 
                    (SELECT deal_id from user_deals where email = ?);
            """;
    
    // public static final String VERIFY_USER_CREDS = "SELECT count(*) FROM users WHERE email = ? AND password = sha(?);";

    public static final String DELETE_USER_DEALS = "DELETE FROM user_deals WHERE email= ? AND deal_id = ?;";

    public static final String GET_SUBSCRIBERS_EMAIL = "SELECT email FROM users WHERE receive_update = true;";

    public static final String GET_USER_BY_EMAIL= "SELECT * FROM users WHERE email = ?";
}