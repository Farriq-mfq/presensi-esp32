import { eventsName } from './events'
declare namespace global {
    let events: typeof eventsName
}
export const events = eventsName;

if (process.env.NODE_ENV !== "production") global.events = eventsName 