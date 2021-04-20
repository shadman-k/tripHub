CREATE TABLE trip (
  trip_name text,
  destination text, 
  list_of_stops text[],
  groupID text,
  members text[],
  createdBy text,
  dateStart date,
  dateEnd date,
  trip_ID uuid,
  PRIMARY KEY (trip_ID)
)