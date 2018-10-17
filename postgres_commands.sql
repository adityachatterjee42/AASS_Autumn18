-- create hotel table
CREATE TABLE Hotel (
    HotelID            int PRIMARY KEY,
    HotelRoom          varchar(80),
    Address            varchar(80),
    City               varchar(80),
	ZipCode			   varchar(80)
);

-- create room table
CREATE TABLE Room (
	RoomID                int PRIMARY KEY,
    RoomNumber            int,
    HotelID        		  int REFERENCES Hotel(HotelID)
);

-- add categorical variable ROOMTYPE to room table
ALTER TABLE Room
ADD ROOMTYPE    varchar(30);

CREATE TABLE Reservation (
    ReservationID            int PRIMARY KEY,
    HotelID                  int REFERENCES Hotel(HotelID),
    RoomID 				     int REFERENCES Room(RoomID),
	GuestID				     int REFERENCES Guest(GuestID),
    CheckinDate              date,
	Numberofdays			 int
);

-- create guest table
CREATE TABLE Guest (
    GuestID            int PRIMARY KEY,
    FirstName          varchar(80),
    LastName           varchar(80),
    Address            varchar(80),
	City			   varchar(80),
	ZipCode			   varchar(80)
);

-- Check indexes on reservation table
SELECT * FROM pg_indexes WHERE tablename = 'reservation';

-- add primary key constraint
ALTER TABLE reservation ADD PRIMARY KEY (reservationid);

-- drop primary key constraint
alter table reservation drop constraint reservation_pkey

-- There is no clustered index in PostgreSQl. Closest thing is cluster but it is a one time operation and changes are not stored. 
-- https://www.postgresql.org/docs/9.1/static/sql-cluster.html
create index reservation_index on reservation (reservationid);
CLUSTER reservation USING reservation_index;

-- add non-clustered index to reservation on guestid
create index reservation_index2 on reservation (guestid); -- default is btree

-- drop index on reservation table
drop index reservation_index
drop index reservation_index2




