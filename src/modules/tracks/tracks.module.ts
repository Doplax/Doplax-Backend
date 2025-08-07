import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [],
})
export class TracksModule {}