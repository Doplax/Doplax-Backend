import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Import working modules
import { AuthModule } from './modules/auth/auth.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { EmailModule } from './modules/email/email.module';

// Database connection setup
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/test'; // Default for testing

@Module({
  imports: [
    // Database connection (optional for testing)
    ...(DB_URI !== 'mongodb://localhost:27017/test' ? [MongooseModule.forRoot(DB_URI)] : []),
    
    // Static files serving
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),

    // Feature modules
    AuthModule,
    TracksModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}