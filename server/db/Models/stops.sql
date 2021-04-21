CREATE TABLE stops (
  stops_name text,
  destination text, 
  groupID text,
  tripID text,
  createdBy text,
  googleMapsID text,
  upvotes text[],
  downvotes text[],
  stop_ID uuid
)