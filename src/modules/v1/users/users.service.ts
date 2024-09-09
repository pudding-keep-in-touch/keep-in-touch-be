import { ConflictException, Injectable } from '@nestjs/common';
import { RequestGetDmListByUserIdDto } from '@v1/direct-messages/dtos/get-dm-list-by-user-id.dto';
import { RequestSignUpDto } from './dtos/signup.dto';
import { UsersRepository } from '@repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { Users } from '@entities/users.entity';

@Injectable()
export class UsersService {
  // constructor(private readonly directMessagesService: DirectMessagesService) {}

  constructor(private readonly usersRepository: UsersRepository) {}

  // 회원가입
  async signup(requestDto: RequestSignUpDto): Promise<Users> {
    // 이메일이 존재하는지 조회
    const existingUser = await this.usersRepository.getUserByEmail(requestDto.email);

    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 존재하지 않으면 유저 생성
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(requestDto.password, salt);

    return await this.usersRepository.createUser(requestDto.email, hashedPassword, 1);
  }

  // 추후 directMessages service 에서 함수 가져와야 함
  async getDmListByUserId(userId: number, request: RequestGetDmListByUserIdDto) {
    const mockDms: any = [
      {
        id: 1,
        senderId: 10,
        receiverId: userId,
        content: '안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
        emotion: {
          name: '응원과 감사',
          emoji: '🌟',
        },
        isRead: false,
        isDeleted: false,
        createdAt: '2024-09-02',
        comments: {
          emoji: '😁',
          content: '덕분에 자신감이 생겼어. 고마워',
          createdAt: '2024-09-02',
        },
      },
      {
        id: 2,
        senderId: 13,
        receiverId: userId,
        content: '토이 프로젝트 끝까지 함께해줘서 정말 고맙습니다.',
        emotion: {
          name: '응원과 감사',
          emoji: '🌟',
        },
        isRead: false,
        isDeleted: false,
        createdAt: '2024-09-02',
        comments: {
          emoji: '🥰',
          content: '함께해서 정말 재밌었습니다. 감사합니다.',
          createdAt: '2024-09-02',
        },
      },
    ];

    if (request.type === 'received') {
      return mockDms;
    }
  }
}
