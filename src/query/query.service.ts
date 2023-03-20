import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { randomUUID } from 'crypto';
import { PostQueryDto } from './dto/post-query.dto';

@Injectable()
export class QueryService {
  private readonly lex = new AWS.LexRuntimeV2();
  private readonly kendra = new AWS.Kendra();

  private async getLexBotAnswer(name: string): Promise<string> {
    const params = {
      botId: process.env.BOT_ID,
      botAliasId: process.env.BOT_ALIAS_ID,
      localeId: 'en_US',
      text: name,
      sessionId: randomUUID()
    };

    try {
      const data = await this.lex.recognizeText(params).promise();
      if ('messages' in data) {
        return data.messages[0].content;
      }
      return null

    } catch (err) {
      console.log(err, "error");
      throw err;
    }
  }

  private async getKendraAnswer(name: string): Promise<string> {
    const params = {
      IndexId: process.env.INDEX_ID,
      QueryText: name
    };

    try {
      const response = await this.kendra.query(params).promise();
      return response.ResultItems[0].DocumentExcerpt.Text;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findCompanyFounder(postQueryDto: PostQueryDto): Promise<string> {
    if (postQueryDto.query.toLowerCase() === 'who is founder of j.p morgan?') {
      return await this.getKendraAnswer(postQueryDto.query);
    } else {
      const lexAnswer = await this.getLexBotAnswer(postQueryDto.query);
      if (lexAnswer) {
        return lexAnswer;
      }

      return "Can't find an answer to that";
    }
  }
}
