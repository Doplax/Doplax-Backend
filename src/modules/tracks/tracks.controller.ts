import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import handleHttpError from '@/utils/errorHandler';
import { tracksList as mainMusicTracks } from '@/public/music/lofi-music';
import { tracksList as lofiMusicTracks } from '@/public/music/lofi-music';
import User from '@/modules/wallapop/models/User.model';

@ApiTags('Tracks')
@Controller('api/tracks')
export class TracksController {

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'Returns all tracks' })
  async getItems() {
    try {
      const allTracks = [...mainMusicTracks, ...lofiMusicTracks];
      return { data: allTracks };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiResponse({ status: 200, description: 'Returns a track by ID' })
  getItem(@Param('id') id: string) {
    // Implementation pending
    return { message: 'Implementation pending', id };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiResponse({ status: 201, description: 'Track created successfully' })
  async createItem(@Body() body: { name: string; age: number; email: string }) {
    try {
      const { name, age, email } = body;
      const resDetail = await User.create({
        name,
        age,
        email,
      });
      return { data: resDetail };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update track by ID' })
  @ApiResponse({ status: 200, description: 'Track updated successfully' })
  updateItem(@Param('id') id: string, @Body() body: any) {
    return { message: 'Update implementation pending', id, body };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track by ID' })
  @ApiResponse({ status: 200, description: 'Track deleted successfully' })
  deleteItem(@Param('id') id: string) {
    return { message: 'Delete implementation pending', id };
  }
}