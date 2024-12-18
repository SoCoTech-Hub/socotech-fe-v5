import type { Schema, Struct } from '@strapi/strapi';

export interface SharedContentIndex extends Struct.ComponentSchema {
  collectionName: 'components_shared_content_indices';
  info: {
    displayName: 'Content index';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
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

export interface SharedCriteria extends Struct.ComponentSchema {
  collectionName: 'components_shared_criteria';
  info: {
    displayName: 'criteria';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    point: Schema.Attribute.Decimal;
    topic: Schema.Attribute.String;
  };
}

export interface SharedCriterionAnswer extends Struct.ComponentSchema {
  collectionName: 'components_shared_criterion_answers';
  info: {
    displayName: 'Criterion answer';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    criterion: Schema.Attribute.Blocks;
  };
}

export interface SharedCustomField extends Struct.ComponentSchema {
  collectionName: 'components_shared_custom_fields';
  info: {
    displayName: 'custom field';
  };
  attributes: {
    name: Schema.Attribute.String;
    options: Schema.Attribute.Blocks;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface SharedEssay extends Struct.ComponentSchema {
  collectionName: 'components_shared_essays';
  info: {
    displayName: 'Essay';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    keyword: Schema.Attribute.Component<'shared.rich-text', true>;
    question: Schema.Attribute.Blocks;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'Faq';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    question: Schema.Attribute.Blocks;
  };
}

export interface SharedFillBlank extends Struct.ComponentSchema {
  collectionName: 'components_shared_fill_blanks';
  info: {
    displayName: 'Fill Blank';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    question: Schema.Attribute.Blocks;
  };
}

export interface SharedFreeChoice extends Struct.ComponentSchema {
  collectionName: 'components_shared_free_choices';
  info: {
    description: '';
    displayName: 'free choice';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    correctAnswer: Schema.Attribute.Component<'shared.correct-answer', true>;
    image: Schema.Attribute.Media<'images'>;
    question: Schema.Attribute.Blocks;
  };
}

export interface SharedGlossary extends Struct.ComponentSchema {
  collectionName: 'components_shared_glossaries';
  info: {
    displayName: 'glossary';
  };
  attributes: {
    definition: Schema.Attribute.Blocks;
    topic: Schema.Attribute.String;
  };
}

export interface SharedMatrixSorting extends Struct.ComponentSchema {
  collectionName: 'components_shared_matrix_sortings';
  info: {
    displayName: 'Matrix sorting';
  };
  attributes: {
    answers: Schema.Attribute.Component<'shared.criterion-answer', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    question: Schema.Attribute.Blocks;
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

export interface SharedModule extends Struct.ComponentSchema {
  collectionName: 'components_shared_modules';
  info: {
    description: '';
    displayName: 'Module';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    description: Schema.Attribute.Blocks;
    name: Schema.Attribute.String;
  };
}

export interface SharedMultipleChoiceQuiz extends Struct.ComponentSchema {
  collectionName: 'components_shared_multiple_choice_quizs';
  info: {
    description: '';
    displayName: 'multiple choice quiz';
  };
  attributes: {
    answer: Schema.Attribute.Component<'shared.single-answer', true>;
    image: Schema.Attribute.Media<'images'>;
    question: Schema.Attribute.Blocks;
  };
}

export interface SharedProductCustomField extends Struct.ComponentSchema {
  collectionName: 'components_shared_product_custom_fields';
  info: {
    displayName: 'product custom field';
  };
  attributes: {
    options: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRetry extends Struct.ComponentSchema {
  collectionName: 'components_shared_retries';
  info: {
    displayName: 'retry';
  };
  attributes: {
    dueDate: Schema.Attribute.DateTime;
    max: Schema.Attribute.Integer;
    min: Schema.Attribute.Integer;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    keyword: Schema.Attribute.RichText;
  };
}

export interface SharedRubiconMark extends Struct.ComponentSchema {
  collectionName: 'components_shared_rubicon_marks';
  info: {
    displayName: 'Rubicon mark';
  };
  attributes: {
    criteria: Schema.Attribute.Blocks;
    remarks: Schema.Attribute.Blocks;
    score: Schema.Attribute.Decimal;
    topic: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSingleAnswer extends Struct.ComponentSchema {
  collectionName: 'components_shared_single_answers';
  info: {
    displayName: 'single answer';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    isCorrect: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    media: Schema.Attribute.Media<'images'>;
    points: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedSingleChoiceQuiz extends Struct.ComponentSchema {
  collectionName: 'components_shared_single_choice_quizs';
  info: {
    displayName: 'single choice quiz';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'videos' | 'audios' | 'files'>;
    question: Schema.Attribute.Blocks;
    single_answer: Schema.Attribute.Component<'shared.single-answer', true>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSortingChoice extends Struct.ComponentSchema {
  collectionName: 'components_shared_sorting_choices';
  info: {
    displayName: 'Sorting choice';
  };
  attributes: {
    answer: Schema.Attribute.Component<'shared.correct-answer', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    question: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.content-index': SharedContentIndex;
      'shared.correct-answer': SharedCorrectAnswer;
      'shared.criteria': SharedCriteria;
      'shared.criterion-answer': SharedCriterionAnswer;
      'shared.custom-field': SharedCustomField;
      'shared.essay': SharedEssay;
      'shared.faq': SharedFaq;
      'shared.fill-blank': SharedFillBlank;
      'shared.free-choice': SharedFreeChoice;
      'shared.glossary': SharedGlossary;
      'shared.matrix-sorting': SharedMatrixSorting;
      'shared.media': SharedMedia;
      'shared.module': SharedModule;
      'shared.multiple-choice-quiz': SharedMultipleChoiceQuiz;
      'shared.product-custom-field': SharedProductCustomField;
      'shared.quote': SharedQuote;
      'shared.retry': SharedRetry;
      'shared.rich-text': SharedRichText;
      'shared.rubicon-mark': SharedRubiconMark;
      'shared.seo': SharedSeo;
      'shared.single-answer': SharedSingleAnswer;
      'shared.single-choice-quiz': SharedSingleChoiceQuiz;
      'shared.slider': SharedSlider;
      'shared.sorting-choice': SharedSortingChoice;
    }
  }
}
