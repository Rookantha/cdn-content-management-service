import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContentService } from './content.service';
import { Content } from './schemas/content.schema';
import { CreateContentDto, UpdateContentDto } from './dto/content.dto';


@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Mutation(() => Content)
  createContent(@Args('input') createContentDto: CreateContentDto) {
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
  updateContent(@Args('id') id: string, @Args('input') updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto);
  }

  @Mutation(() => Boolean)
  deleteContent(@Args('id') id: string) {
    return this.contentService.delete(id).then(() => true);
  }
}
