import mongoose, { Document, Model, Schema } from "mongoose";

interface ICourseReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies: IComment;
}

interface IComment extends Document {
  user: object;
  comment: string;
  commentReplies?: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseDetails extends Document {
  title: string;
  description: string;
  videoSection: string;
  videoLength: string;
  videoUrl: string;
  videoThumbnail: object;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string };
  prerequisites: { title: string };
  review: ICourseReview[];
  courseData: ICourseDetails[];
  ratings?: number;
  purchase?: number;
}

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const reviewSchema = new Schema<ICourseReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
});

const commentSchema = new Schema<IComment>({
  user: Object,
  comment: String,
  commentReplies: [Object],
});

const courseDetailsSchema = new Schema<ICourseDetails>({
  videoSection: String,
  videoLength: Number,
  videoUrl: String,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
  title: String,
  description: String,
});

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: {
    type: Number,
  },
  thumbnail: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  tags: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  demoUrl: {
    type: String,
    required: true,
  },

  benefits: [{ title: String }],
  prerequisites: [{ title: String }],
  review: [reviewSchema],
  courseData: [courseDetailsSchema],
  ratings: {
    type: Number,
    default: 0,
  },
  purchase: {
    type: Number,
    default: 0,
  },
});

const courseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default courseModel;
