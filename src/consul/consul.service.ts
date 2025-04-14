import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ConsulService implements OnModuleInit, OnModuleDestroy {
  private readonly serviceId = 'content-management-service';
  private readonly port = parseInt(process.env.PORT || '3000', 10);
  private readonly host = process.env.SERVICE_HOST || 'host.docker.internal'; // or local IP

  async onModuleInit() {
    const serviceDefinition = {
      ID: this.serviceId,
      Name: 'content-management-service',
      Address: this.host,
      Port: this.port,
      Check: {
        HTTP: `http://${this.host}:${this.port}/health`,
        Interval: '10s',
        Timeout: '1s',
        DeregisterCriticalServiceAfter: '1m',
      },
    };

    try {
      await axios.put(
        'http://localhost:8500/v1/agent/service/register',
        serviceDefinition,
      );
      console.log('✅ Registered with Consul');
    } catch (err) {
      console.error('❌ Consul registration failed:', err);
    }
  }

  async onModuleDestroy() {
    try {
      await axios.put(
        `http://localhost:8500/v1/agent/service/deregister/${this.serviceId}`,
      );
      console.log('🛑 Deregistered from Consul');
    } catch (err) {
      console.error('❌ Error during Consul deregistration:', err);
    }
  }
}
