import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export class RequestGetDmListByUserIdDto {
  @ApiProperty({
    name: 'type',
    example: 'received',
    description: '조회 타입(received: 쪽지 받은, sent: 쪽지 보낸)',
    required: false,
  })
  @IsEnum(['received', 'sent'])
  @IsOptional()
  type?: 'received' | 'sent' = 'received';

  @ApiProperty({
    name: 'page',
    example: 1,
    description: '조회 할 페이지',
    required: false,
    default: 1,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    name: 'limit',
    example: 10,
    description: '조회 갯수',
    required: false,
    default: 10,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    name: 'order',
    example: 'desc',
    description: '조회 순서(desc: 내림차순, asc: 오름차순)',
    required: false,
  })
  @IsEnum(['desc', 'asc'])
  @IsOptional()
  order?: 'desc' | 'asc' = 'desc';
}

class EmotionDto {
  @ApiProperty({ description: '감정 이름', example: '행복' })
  name: string;

  @ApiProperty({ description: '감정 이모지', example: '😊' })
  emoji: string;
}

export class ResponseGetDmListByUserIdDto {
  @ApiProperty({ description: '쪽지 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '보낸 사람 ID', example: 2 })
  senderId: number;

  @ApiProperty({ description: '받는 사람 ID', example: 3 })
  receiverId: number;

  @ApiProperty({ description: '쪽지 내용', example: '안녕하세요, 잘 지내시나요?' })
  content: string;

  @ApiProperty({ description: '감정 정보' })
  emotion: EmotionDto;

  @ApiProperty({ description: '댓글', example: null, type: 'object', nullable: true })
  comment: Record<string, any> | null;

  @ApiProperty({ description: '읽음 여부', example: false })
  isRead: boolean;

  @ApiProperty({ description: '생성 시간', example: '2024-09-15T10:30:00Z' })
  createdAt: Date;
}