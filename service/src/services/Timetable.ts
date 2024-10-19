import { Timetable } from "@prisma/client";
import { prisma } from "../db";
import { Result, Ok, Err } from "ts-results";
import { AccountService } from ".";


// Check if two events overlap
export const doEventsOverlap = (event1: PrismaScheduledEvent, event2: PrismaScheduledEvent): boolean => {
  return (
    (event1.startTime < event2.endTime && event1.endTime > event2.startTime) // Adjust based on your event time properties
  );
};

// Function to check for overlaps in the provided scheduled events
export const checkForOverlaps = (events: PrismaScheduledEvent[]): string[] => {
  const overlappingEvents: string[] = [];

  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      if (doEventsOverlap(events[i], events[j])) {
        overlappingEvents.push(`Event IDs: ${events[i].id} and ${events[j].id}`);
      }
    }
  }

  return overlappingEvents;
};

// Modify createTimetable to check for overlaps
export const createTimetable = async (
  email: string,
  name: string,
  scheduledEventIds: string[],
): Promise<Result<Timetable, Error>> => {
  const account = await AccountService.findByEmail(email);

  if (account === null) {
    return Err(new Error("Account not found"));
  }

  
  // Check for overlapping events
  const overlappingEvents = checkForOverlaps(events);
  if (overlappingEvents.length > 0) {
    return Err(new Error(`Overlapping events detected: ${overlappingEvents.join(', ')}`));
  }


  // const events = await prisma.scheduledEvent.findMany({
  //   where: {
  //     id: {
  //       in: scheduledEventIds.map((id) => parseInt(id)),
  //     },
  //   },
  // });



  const timetable = await prisma.timetable.create({
    data: {
      name,
      account: {
        connect: {
          id: account.id,
        },
      },
      timetableEvents: {
        create: scheduledEventIds.map((id) => ({
          scheduledEvent: {
            connect: {
              id: parseInt(id),
            },
          },
        })),
      },
    },
  });

  return Ok(timetable);
};

export const getTimetableById = async (
  id: number,
): Promise<Result<Timetable, Error>> => {
  const timetable = await prisma.timetable.findUnique({
    where: {
      id,
    },
    include: {
      timetableEvents: {
        include: {
          scheduledEvent: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  if (timetable === null) {
    return Err(new Error("Timetable not found"));
  }

  return Ok(timetable);
};

export const getAccountTimetables = async (
  email: string,
): Promise<Result<Timetable[], Error>> => {
  const account = await AccountService.findByEmail(email);

  if (account === null) {
    return Err(new Error("Account not found"));
  }

  const timetables = await prisma.timetable.findMany({
    where: {
      accountId: account.id,
    },
    include: {
      timetableEvents: {
        include: {
          scheduledEvent: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  return Ok(timetables);
};
