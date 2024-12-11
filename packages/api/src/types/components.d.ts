import type { Struct, Schema } from '@strapi/strapi';

export interface SharedSortingChoice extends Struct.ComponentSchema {
  collectionName: 'components_shared_sorting_choices';
  info: {
    displayName: 'Sorting choice';
  };
  attributes: {
    question: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    answer: Schema.Attribute.Component<'shared.correct-answer', true>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSingleChoiceQuiz extends Struct.ComponentSchema {
  collectionName: 'components_shared_single_choice_quizs';
  info: {
    displayName: 'single choice quiz';
  };
  attributes: {
    question: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'videos' | 'audios' | 'files'>;
    single_answer: Schema.Attribute.Component<'shared.single-answer', true>;
  };
}

export interface SharedSingleAnswer extends Struct.ComponentSchema {
  collectionName: 'components_shared_single_answers';
  info: {
    displayName: 'single answer';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    media: Schema.Attribute.Media<'images'>;
    points: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    isCorrect: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedRubiconMark extends Struct.ComponentSchema {
  collectionName: 'components_shared_rubicon_marks';
  info: {
    displayName: 'Rubicon mark';
  };
  attributes: {
    remarks: Schema.Attribute.Blocks;
    score: Schema.Attribute.Decimal;
    criteria: Schema.Attribute.Blocks;
    topic: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    keyword: Schema.Attribute.RichText;
  };
}

export interface SharedRetry extends Struct.ComponentSchema {
  collectionName: 'components_shared_retries';
  info: {
    displayName: 'retry';
  };
  attributes: {
    min: Schema.Attribute.Integer;
    max: Schema.Attribute.Integer;
    dueDate: Schema.Attribute.DateTime;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: Schema.Attribute.String;
    body: Schema.Attribute.Text;
  };
}

export interface SharedProductCustomField extends Struct.ComponentSchema {
  collectionName: 'components_shared_product_custom_fields';
  info: {
    displayName: 'product custom field';
  };
  attributes: {
    title: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    options: Schema.Attribute.String;
  };
}

export interface SharedMultipleChoiceQuiz extends Struct.ComponentSchema {
  collectionName: 'components_shared_multiple_choice_quizs';
  info: {
    displayName: 'multiple choice quiz';
    description: '';
  };
  attributes: {
    question: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    answer: Schema.Attribute.Component<'shared.single-answer', true>;
  };
}

export interface SharedModule extends Struct.ComponentSchema {
  collectionName: 'components_shared_modules';
  info: {
    displayName: 'Module';
    description: '';
  };
  attributes: {
    name: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    content: Schema.Attribute.Blocks;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMatrixSorting extends Struct.ComponentSchema {
  collectionName: 'components_shared_matrix_sortings';
  info: {
    displayName: 'Matrix sorting';
  };
  attributes: {
    question: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    answers: Schema.Attribute.Component<'shared.criterion-answer', true>;
  };
}

export interface SharedGlossary extends Struct.ComponentSchema {
  collectionName: 'components_shared_glossaries';
  info: {
    displayName: 'glossary';
  };
  attributes: {
    topic: Schema.Attribute.String;
    definition: Schema.Attribute.Blocks;
  };
}

export interface SharedFreeChoice extends Struct.ComponentSchema {
  collectionName: 'components_shared_free_choices';
  info: {
    displayName: 'free choice';
    description: '';
  };
  attributes: {
    question: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    correctAnswer: Schema.Attribute.Component<'shared.correct-answer', true>;
    answer: Schema.Attribute.Blocks;
  };
}

export interface SharedFillBlank extends Struct.ComponentSchema {
  collectionName: 'components_shared_fill_blanks';
  info: {
    displayName: 'Fill Blank';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    question: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'Faq';
  };
  attributes: {
    question: Schema.Attribute.Blocks;
    answer: Schema.Attribute.Blocks;
  };
}

export interface SharedEssay extends Struct.ComponentSchema {
  collectionName: 'components_shared_essays';
  info: {
    displayName: 'Essay';
  };
  attributes: {
    question: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    keyword: Schema.Attribute.Component<'shared.rich-text', true>;
    answer: Schema.Attribute.Blocks;
  };
}

export interface SharedCustomField extends Struct.ComponentSchema {
  collectionName: 'components_shared_custom_fields';
  info: {
    displayName: 'custom field';
  };
  attributes: {
    name: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    options: Schema.Attribute.Blocks;
  };
}

export interface SharedCriterionAnswer extends Struct.ComponentSchema {
  collectionName: 'components_shared_criterion_answers';
  info: {
    displayName: 'Criterion answer';
  };
  attributes: {
    criterion: Schema.Attribute.Blocks;
    answer: Schema.Attribute.Blocks;
  };
}

export interface SharedCriteria extends Struct.ComponentSchema {
  collectionName: 'components_shared_criteria';
  info: {
    displayName: 'criteria';
  };
  attributes: {
    topic: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    point: Schema.Attribute.Decimal;
  };
}

export interface SharedCorrectAnswer extends Struct.ComponentSchema {
  collectionName: 'components_shared_correct_answers';
  info: {
    displayName: 'Correct Answer';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    isCorrect: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface SharedContentIndex extends Struct.ComponentSchema {
  collectionName: 'components_shared_content_indices';
  info: {
    displayName: 'Content index';
  };
  attributes: {
    name: Schema.Attribute.String;
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.sorting-choice': SharedSortingChoice;
      'shared.slider': SharedSlider;
      'shared.single-choice-quiz': SharedSingleChoiceQuiz;
      'shared.single-answer': SharedSingleAnswer;
      'shared.seo': SharedSeo;
      'shared.rubicon-mark': SharedRubiconMark;
      'shared.rich-text': SharedRichText;
      'shared.retry': SharedRetry;
      'shared.quote': SharedQuote;
      'shared.product-custom-field': SharedProductCustomField;
      'shared.multiple-choice-quiz': SharedMultipleChoiceQuiz;
      'shared.module': SharedModule;
      'shared.media': SharedMedia;
      'shared.matrix-sorting': SharedMatrixSorting;
      'shared.glossary': SharedGlossary;
      'shared.free-choice': SharedFreeChoice;
      'shared.fill-blank': SharedFillBlank;
      'shared.faq': SharedFaq;
      'shared.essay': SharedEssay;
      'shared.custom-field': SharedCustomField;
      'shared.criterion-answer': SharedCriterionAnswer;
      'shared.criteria': SharedCriteria;
      'shared.correct-answer': SharedCorrectAnswer;
      'shared.content-index': SharedContentIndex;
    }
  }
}
