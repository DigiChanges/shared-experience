import { Subject } from 'rxjs';
import { IEvent } from './IEvent';

type SubscribeEventProps =
{
    eventName: string;
    args: Record<string, unknown>;
}

export class EventHandler
{
    private static instance: EventHandler;
    private eventSubject: Subject<any>;
    private events: Map<string, (args: any) => Promise<void>>;

    private constructor()
    {
        this.events = new Map<string, (args: any) => Promise<void>>();
        this.eventSubject = new Subject<any>();

        this.eventSubject.subscribe((event: SubscribeEventProps) =>
        {
            const { eventName, args } = event;
            const eventHandler = this.events.get(eventName);

            if (eventHandler)
            {
                void (async() =>
                {
                    try
                    {
                        eventHandler(args).then()
                    }
                    catch (error)
                    {
                        console.log(error);
                    }
                })();
            }
        });
    }

    static getInstance(): EventHandler
    {
        if (!EventHandler.instance)
        {
            EventHandler.instance = new EventHandler();
        }

        return EventHandler.instance;
    }

    public execute(eventName: string, args: any)
    {
        this.eventSubject.next({ eventName, args });
    }

    public setEvent(_event: IEvent)
    {
        if (this.events.has(_event.name)) {
            return;
        }

        this.events.set(_event.name, _event.handle);
    }

    public async removeListeners()
    {
        this.eventSubject.complete();
    }
}
