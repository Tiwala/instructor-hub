import postgres from "postgres";

const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
const sql = postgres(
  process.env.DB_CONNECTION_URL,
  process.env.NODE_ENV === "production"
    ? {
        ssl: { rejectUnauthorized: false },
        max_lifetime: 60 * 30,
      }
    : {}
);

export default async function assignGroupings(req, res) {
  if (req.method === "POST") {
    try {
      const { group_assignment_id, student_id, group_id } = req.body;
      console.log(req.body);
      const assignGroup = await sql`
               INSERT INTO pairs (student_id, group_id ) VALUES (${student_id}, ${group_id}) RETURNING *`;
      res.status(200).json({ assignGroup });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}