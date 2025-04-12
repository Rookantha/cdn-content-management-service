import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContentService } from './content.service';
import { Content } from './schemas/content.schema';
import { CreateContentDto } from './dto/create.content.dto';
import { UpdateContentDto } from './dto/update.content.dto';
import { ValidateCreateContentPipe } from './pipes/validate.create.content.pipe';
import { ValidateUpdateContentPipe } from './pipes/validate.update.content.pipe';


@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Mutation(() => Content)
  createContent(@Args('input',new ValidateCreateContentPipe()) createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Query(() => [Content])
  getAllContent() {
    return this.contentService.findAll();
  }

  @Query(() => Content)
  getContentById(@Args('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Mutation(() => Content)
  updateContent(@Args('id') id: string, @Args('input',new ValidateUpdateContentPipe()) updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto);
  }

  @Mutation(() => Boolean)
  deleteContent(@Args('id') id: string) {
    return this.contentService.delete(id).then(() => true);
  }
}
