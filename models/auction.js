const getHistory = async (db , auctionId) => {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT 
                bid,
                u.register_number
            FROM auction_histories as ah
            INNER JOIN users  as u ON ah.user_id = u.id
            where ah.auction_id = (
                SELECT id FROM auctions where uuid = ?
                )
            ORDER BY ah.id DESC
            LIMIT 25 
        `, [auctionId], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

module.exports = {
    getHistory
}