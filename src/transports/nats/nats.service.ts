import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../../config/services-tokens';
import { Observable } from 'rxjs';

@Injectable()
export class NatsService {
  private readonly logger = new Logger(NatsService.name);

  constructor(
    @Inject(NATS_SERVICE)
    private readonly clientProxy: ClientProxy,
  ) {}

  /**
   * Send a message to the server/broker.
   * Used for message-driven communication style between microservices.
   * @param pattern Pattern to identify the message
   * @param data Data to be sent
   * @returns Observable with the result
   */
  send<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    this.logger.log(`Sending message with pattern: ${pattern}`);

    return this.clientProxy.send<TResult, TInput>(pattern, data);
  }
}
