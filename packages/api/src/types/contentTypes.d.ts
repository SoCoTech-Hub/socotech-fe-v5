import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAccessAccess extends Struct.CollectionTypeSchema {
  collectionName: 'accesses';
  info: {
    description: '';
    displayName: 'Access';
    pluralName: 'accesses';
    singularName: 'access';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::access.access'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    paid: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
  };
}

export interface ApiAddressAddress extends Struct.CollectionTypeSchema {
  collectionName: 'addresses';
  info: {
    description: '';
    displayName: 'Address';
    pluralName: 'addresses';
    singularName: 'address';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    addressLine1: Schema.Attribute.String;
    addressLine2: Schema.Attribute.String;
    contactNr: Schema.Attribute.String;
    country: Schema.Attribute.Relation<'oneToOne', 'api::country.country'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::address.address'
    > &
      Schema.Attribute.Private;
    postalCode: Schema.Attribute.String;
    profile: Schema.Attribute.Relation<'manyToOne', 'api::profile.profile'>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    town: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateDetailAffiliateDetail
  extends Struct.CollectionTypeSchema {
  collectionName: 'affiliate_details';
  info: {
    displayName: 'Affiliate Detail';
    pluralName: 'affiliate-details';
    singularName: 'affiliate-detail';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    affiliate: Schema.Attribute.Relation<
      'manyToOne',
      'api::affiliate.affiliate'
    >;
    bank: Schema.Attribute.String;
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-detail.affiliate-detail'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    number: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateSettingAffiliateSetting
  extends Struct.CollectionTypeSchema {
  collectionName: 'affiliate_settings';
  info: {
    displayName: 'Affiliate Setting';
    pluralName: 'affiliate-settings';
    singularName: 'affiliate-setting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-setting.affiliate-setting'
    > &
      Schema.Attribute.Private;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    rate: Schema.Attribute.Decimal;
    terms: Schema.Attribute.Blocks;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateStatusAffiliateStatus
  extends Struct.CollectionTypeSchema {
  collectionName: 'affiliate_statuses';
  info: {
    displayName: 'Affiliate Status';
    pluralName: 'affiliate-statuses';
    singularName: 'affiliate-status';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-status.affiliate-status'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateTransactionAffiliateTransaction
  extends Struct.CollectionTypeSchema {
  collectionName: 'affiliate_transactions';
  info: {
    displayName: 'Affiliate Transaction';
    pluralName: 'affiliate-transactions';
    singularName: 'affiliate-transaction';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    accountNumber: Schema.Attribute.String;
    affiliate: Schema.Attribute.Relation<
      'oneToOne',
      'api::affiliate.affiliate'
    >;
    affiliateStatus: Schema.Attribute.Relation<
      'oneToOne',
      'api::affiliate-status.affiliate-status'
    >;
    balance: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-transaction.affiliate-transaction'
    > &
      Schema.Attribute.Private;
    paid: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    paidDate: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAffiliateAffiliate extends Struct.CollectionTypeSchema {
  collectionName: 'affiliates';
  info: {
    displayName: 'Affiliate';
    pluralName: 'affiliates';
    singularName: 'affiliate';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    affiliate_details: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate-detail.affiliate-detail'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isApproved: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::affiliate.affiliate'
    > &
      Schema.Attribute.Private;
    note: Schema.Attribute.Blocks;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiApplicationCategoryApplicationCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'application_categories';
  info: {
    description: '';
    displayName: 'Application Category';
    pluralName: 'application-categories';
    singularName: 'application-category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    applications: Schema.Attribute.Relation<
      'manyToMany',
      'api::application.application'
    >;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    companies: Schema.Attribute.Relation<
      'manyToMany',
      'api::application-company.application-company'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::application-category.application-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiApplicationCompanyApplicationCompany
  extends Struct.CollectionTypeSchema {
  collectionName: 'application_companies';
  info: {
    displayName: 'Application Company';
    pluralName: 'application-companies';
    singularName: 'application-company';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::application-category.application-category'
    >;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    icon: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::application-company.application-company'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiApplicationResponseApplicationResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'application_responses';
  info: {
    displayName: 'Application Response';
    pluralName: 'application-responses';
    singularName: 'application-response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    application: Schema.Attribute.Relation<
      'oneToOne',
      'api::application.application'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::application-response.application-response'
    > &
      Schema.Attribute.Private;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiApplicationApplication extends Struct.CollectionTypeSchema {
  collectionName: 'applications';
  info: {
    description: '';
    displayName: 'Application';
    pluralName: 'applications';
    singularName: 'application';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    application: Schema.Attribute.Blocks;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::application-category.application-category'
    >;
    close: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::application.application'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    note: Schema.Attribute.Blocks;
    open: Schema.Attribute.DateTime;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    particulars: Schema.Attribute.Blocks;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
    value: Schema.Attribute.Blocks;
    whoQualifies: Schema.Attribute.Blocks;
  };
}

export interface ApiArticleCategoryArticleCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'article_categories';
  info: {
    displayName: 'Article Category';
    pluralName: 'article-categories';
    singularName: 'article-category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    articles: Schema.Attribute.Relation<'manyToMany', 'api::article.article'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article-category.article-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiArticleSavedArticleSaved
  extends Struct.CollectionTypeSchema {
  collectionName: 'article_saveds';
  info: {
    displayName: 'Article Saved';
    pluralName: 'article-saveds';
    singularName: 'article-saved';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article-saved.article-saved'
    > &
      Schema.Attribute.Private;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiArticleTagArticleTag extends Struct.CollectionTypeSchema {
  collectionName: 'article_tags';
  info: {
    displayName: 'Article Tag';
    pluralName: 'article-tags';
    singularName: 'article-tag';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    articles: Schema.Attribute.Relation<'manyToMany', 'api::article.article'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article-tag.article-tag'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiArticleArticle extends Struct.CollectionTypeSchema {
  collectionName: 'articles';
  info: {
    description: '';
    displayName: 'Article';
    pluralName: 'articles';
    singularName: 'article';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::article-category.article-category'
    >;
    content: Schema.Attribute.DynamicZone<['shared.rich-text', 'shared.media']>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article.article'
    > &
      Schema.Attribute.Private;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    shortDescription: Schema.Attribute.Blocks;
    slug: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    tags: Schema.Attribute.Relation<
      'manyToMany',
      'api::article-tag.article-tag'
    >;
    targets: Schema.Attribute.Relation<'manyToMany', 'api::target.target'>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAssignmentReplyAssignmentReply
  extends Struct.CollectionTypeSchema {
  collectionName: 'assignment_replies';
  info: {
    description: '';
    displayName: 'Assignment Reply';
    pluralName: 'assignment-replies';
    singularName: 'assignment-reply';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    attachmentReply: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    attempt: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    feedback: Schema.Attribute.Blocks;
    grade: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    instructor: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    isCompleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isGrouped: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    lesson_assignment: Schema.Attribute.Relation<
      'oneToOne',
      'api::lesson-assignment.lesson-assignment'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::assignment-reply.assignment-reply'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    students: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAudioPlaylistAudioPlaylist
  extends Struct.CollectionTypeSchema {
  collectionName: 'audio_playlists';
  info: {
    displayName: 'Audio Playlist';
    pluralName: 'audio-playlists';
    singularName: 'audio-playlist';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::audio-playlist.audio-playlist'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.JSON;
  };
}

export interface ApiBursaryCategoryBursaryCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'bursary_categories';
  info: {
    displayName: 'Bursary Category';
    pluralName: 'bursary-categories';
    singularName: 'bursary-category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bursaries: Schema.Attribute.Relation<'manyToMany', 'api::bursary.bursary'>;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    institutes: Schema.Attribute.Relation<
      'manyToMany',
      'api::institute.institute'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bursary-category.bursary-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBursaryResponseBursaryResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'bursary_responses';
  info: {
    description: '';
    displayName: 'Bursary Response';
    pluralName: 'bursary-responses';
    singularName: 'bursary-response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bursary: Schema.Attribute.Relation<'oneToOne', 'api::bursary.bursary'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bursary-response.bursary-response'
    > &
      Schema.Attribute.Private;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBursaryBursary extends Struct.CollectionTypeSchema {
  collectionName: 'bursaries';
  info: {
    displayName: 'Bursary';
    pluralName: 'bursaries';
    singularName: 'bursary';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    application: Schema.Attribute.Blocks;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::bursary-category.bursary-category'
    >;
    close: Schema.Attribute.Date;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bursary.bursary'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    note: Schema.Attribute.Blocks;
    open: Schema.Attribute.Date;
    particulars: Schema.Attribute.Blocks;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
    value: Schema.Attribute.Blocks;
    whoQualifies: Schema.Attribute.Blocks;
  };
}

export interface ApiCommentComment extends Struct.CollectionTypeSchema {
  collectionName: 'comments';
  info: {
    description: '';
    displayName: 'Comment';
    pluralName: 'comments';
    singularName: 'comment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    comment: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::comment.comment'
    > &
      Schema.Attribute.Private;
    parent: Schema.Attribute.Relation<'oneToOne', 'api::comment.comment'>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    social: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCountryCountry extends Struct.CollectionTypeSchema {
  collectionName: 'countries';
  info: {
    displayName: 'Country';
    pluralName: 'countries';
    singularName: 'country';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::country.country'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    shortCode: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDistrictDistrict extends Struct.CollectionTypeSchema {
  collectionName: 'districts';
  info: {
    displayName: 'District';
    pluralName: 'districts';
    singularName: 'district';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    country: Schema.Attribute.Relation<'oneToOne', 'api::country.country'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::district.district'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    suburbs: Schema.Attribute.Relation<'oneToMany', 'api::suburb.suburb'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEmailListEmailList extends Struct.CollectionTypeSchema {
  collectionName: 'email_lists';
  info: {
    displayName: 'Email List';
    pluralName: 'email-lists';
    singularName: 'email-list';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    body: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    from: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::email-list.email-list'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    subject: Schema.Attribute.String;
    to: Schema.Attribute.Relation<'oneToOne', 'plugin::users-permissions.user'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEmoticonEmoticon extends Struct.CollectionTypeSchema {
  collectionName: 'emoticons';
  info: {
    displayName: 'Emoticon';
    pluralName: 'emoticons';
    singularName: 'emoticon';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    icon: Schema.Attribute.Media<'images' | 'files'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emoticon.emoticon'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEventResponseEventResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'event_responses';
  info: {
    displayName: 'Event Response';
    pluralName: 'event-responses';
    singularName: 'event-response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attending: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    event: Schema.Attribute.Relation<'oneToOne', 'api::event.event'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::event-response.event-response'
    > &
      Schema.Attribute.Private;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    read: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEventEvent extends Struct.CollectionTypeSchema {
  collectionName: 'events';
  info: {
    description: '';
    displayName: 'Event';
    pluralName: 'events';
    singularName: 'event';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    desciption: Schema.Attribute.Blocks;
    end: Schema.Attribute.DateTime;
    grade: Schema.Attribute.Relation<'oneToOne', 'api::grade.grade'>;
    image: Schema.Attribute.Media<'images'>;
    isLive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::event.event'> &
      Schema.Attribute.Private;
    location: Schema.Attribute.Text;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    private: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    school: Schema.Attribute.Relation<'oneToOne', 'api::school.school'>;
    start: Schema.Attribute.DateTime;
    student: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    suburb: Schema.Attribute.Relation<'oneToOne', 'api::suburb.suburb'>;
    teacher: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
  };
}

export interface ApiFacultyFaculty extends Struct.CollectionTypeSchema {
  collectionName: 'faculties';
  info: {
    description: '';
    displayName: 'Faculty';
    pluralName: 'faculties';
    singularName: 'faculty';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    about: Schema.Attribute.Blocks;
    background: Schema.Attribute.Media<'images'>;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    icon: Schema.Attribute.Media<'images'>;
    institutes: Schema.Attribute.Relation<
      'manyToMany',
      'api::institute.institute'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faculty.faculty'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    qualifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::qualification.qualification'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFaqCategoryFaqCategory extends Struct.CollectionTypeSchema {
  collectionName: 'faq_categories';
  info: {
    displayName: 'FAQ Category';
    pluralName: 'faq-categories';
    singularName: 'faq-category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faq-category.faq-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFaqFaq extends Struct.CollectionTypeSchema {
  collectionName: 'faqs';
  info: {
    displayName: 'FAQ';
    pluralName: 'faqs';
    singularName: 'faq';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    category: Schema.Attribute.Relation<
      'manyToOne',
      'api::faq-category.faq-category'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'> &
      Schema.Attribute.Private;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    question: Schema.Attribute.Blocks;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFeedFeed extends Struct.CollectionTypeSchema {
  collectionName: 'feeds';
  info: {
    displayName: 'Feed';
    pluralName: 'feeds';
    singularName: 'feed';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::feed.feed'> &
      Schema.Attribute.Private;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    targets: Schema.Attribute.Relation<'oneToMany', 'api::target.target'>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
    videoLink: Schema.Attribute.String;
  };
}

export interface ApiForumForum extends Struct.CollectionTypeSchema {
  collectionName: 'forums';
  info: {
    description: '';
    displayName: 'Forum';
    pluralName: 'forums';
    singularName: 'forum';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::forum.forum'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    pin: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    publishedAt: Schema.Attribute.DateTime;
    question: Schema.Attribute.Blocks;
    slug: Schema.Attribute.UID<'name'>;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiGenderGender extends Struct.CollectionTypeSchema {
  collectionName: 'genders';
  info: {
    displayName: 'Gender';
    pluralName: 'genders';
    singularName: 'gender';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::gender.gender'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGradeGrade extends Struct.CollectionTypeSchema {
  collectionName: 'grades';
  info: {
    description: '';
    displayName: 'Grade';
    pluralName: 'grades';
    singularName: 'grade';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    icon: Schema.Attribute.Media<'images'>;
    knowledgeBases: Schema.Attribute.Relation<
      'manyToMany',
      'api::knowledge-base.knowledge-base'
    >;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::grade.grade'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    subjects: Schema.Attribute.Relation<'manyToMany', 'api::subject.subject'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHistoryHistory extends Struct.CollectionTypeSchema {
  collectionName: 'histories';
  info: {
    displayName: 'History';
    pluralName: 'histories';
    singularName: 'history';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    action: Schema.Attribute.String;
    content: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::history.history'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInMailResponseInMailResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'in_mail_responses';
  info: {
    displayName: 'InMail Response';
    pluralName: 'in-mail-responses';
    singularName: 'in-mail-response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    important: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    inMail: Schema.Attribute.Relation<'oneToOne', 'api::in-mail.in-mail'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::in-mail-response.in-mail-response'
    > &
      Schema.Attribute.Private;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    read: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    starred: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInMailInMail extends Struct.CollectionTypeSchema {
  collectionName: 'in_mails';
  info: {
    description: '';
    displayName: 'In Mail';
    pluralName: 'in-mails';
    singularName: 'in-mail';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    bcc: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    body: Schema.Attribute.Blocks;
    cc: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    draft: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    from: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::in-mail.in-mail'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    reply: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    replyParent: Schema.Attribute.Relation<'oneToOne', 'api::in-mail.in-mail'>;
    subject: Schema.Attribute.String;
    to: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInfoInfo extends Struct.CollectionTypeSchema {
  collectionName: 'infos';
  info: {
    displayName: 'Info';
    pluralName: 'infos';
    singularName: 'info';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::info.info'> &
      Schema.Attribute.Private;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInstituteInstitute extends Struct.CollectionTypeSchema {
  collectionName: 'institutes';
  info: {
    displayName: 'Institute';
    pluralName: 'institutes';
    singularName: 'institute';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    bursaryCategories: Schema.Attribute.Relation<
      'manyToMany',
      'api::bursary-category.bursary-category'
    >;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faculties: Schema.Attribute.Relation<'manyToMany', 'api::faculty.faculty'>;
    icon: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::institute.institute'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInvoiceInvoice extends Struct.CollectionTypeSchema {
  collectionName: 'invoices';
  info: {
    description: '';
    displayName: 'Invoice';
    pluralName: 'invoices';
    singularName: 'invoice';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    body: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invoice.invoice'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sender: Schema.Attribute.Email;
    shipTo: Schema.Attribute.Email;
    transaction: Schema.Attribute.Relation<
      'oneToOne',
      'api::transaction.transaction'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiJobApplicationJobApplication
  extends Struct.CollectionTypeSchema {
  collectionName: 'job_applications';
  info: {
    displayName: 'Job Application';
    pluralName: 'job-applications';
    singularName: 'job-application';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    body: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    institution: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::job-application.job-application'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    term: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiKbCategoryKbCategory extends Struct.CollectionTypeSchema {
  collectionName: 'kb_categories';
  info: {
    displayName: 'KB Category';
    pluralName: 'kb-categories';
    singularName: 'kb-category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    bgColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    knowledgeBases: Schema.Attribute.Relation<
      'manyToMany',
      'api::knowledge-base.knowledge-base'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::kb-category.kb-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiKbTopicKbTopic extends Struct.CollectionTypeSchema {
  collectionName: 'kb_topics';
  info: {
    displayName: 'KB Topic';
    pluralName: 'kb-topics';
    singularName: 'kb-topic';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    knowledgeBases: Schema.Attribute.Relation<
      'manyToMany',
      'api::knowledge-base.knowledge-base'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::kb-topic.kb-topic'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiKnowledgeBaseKnowledgeBase
  extends Struct.CollectionTypeSchema {
  collectionName: 'knowledge_bases';
  info: {
    description: '';
    displayName: 'Knowledge Base';
    pluralName: 'knowledge-bases';
    singularName: 'knowledge-base';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    access: Schema.Attribute.Relation<'oneToOne', 'api::access.access'>;
    attachment: Schema.Attribute.Media<
      'images' | 'videos' | 'audios' | 'files',
      true
    >;
    author: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::kb-category.kb-category'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    download: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    estimatedReadingTime: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    grades: Schema.Attribute.Relation<'manyToMany', 'api::grade.grade'>;
    language: Schema.Attribute.String & Schema.Attribute.DefaultTo<'English'>;
    link: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::knowledge-base.knowledge-base'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    releaseYear: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<2024>;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    topics: Schema.Attribute.Relation<'manyToMany', 'api::kb-topic.kb-topic'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonAssignmentLessonAssignment
  extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_assignments';
  info: {
    displayName: 'Lesson Assignment';
    pluralName: 'lesson-assignments';
    singularName: 'lesson-assignment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    dueDate: Schema.Attribute.DateTime &
      Schema.Attribute.DefaultTo<'2024-10-21T22:00:00.000Z'>;
    isCompleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isGrouped: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-assignment.lesson-assignment'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    question: Schema.Attribute.Blocks;
    reminderDate: Schema.Attribute.DateTime &
      Schema.Attribute.DefaultTo<'2024-10-20T22:00:00.000Z'>;
    retry: Schema.Attribute.Component<'shared.retry', true>;
    rubicon: Schema.Attribute.DynamicZone<['shared.criteria']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonAudioLessonAudio extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_audios';
  info: {
    description: '';
    displayName: 'Lesson Audio';
    pluralName: 'lesson-audios';
    singularName: 'lesson-audio';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audio: Schema.Attribute.Media<'audios', true>;
    audioLinks: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    duration: Schema.Attribute.Integer;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-audio.lesson-audio'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonModuleLessonModule
  extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_modules';
  info: {
    displayName: 'Lesson Module';
    pluralName: 'lesson-modules';
    singularName: 'lesson-module';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachment: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    audioFiles: Schema.Attribute.Media<'files' | 'audios', true>;
    content: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    downloadAttachment: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    downloadAudio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    duration: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-module.lesson-module'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoLink: Schema.Attribute.String;
  };
}

export interface ApiLessonQuizLessonQuiz extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_quizs';
  info: {
    description: '';
    displayName: 'Lesson Quiz';
    pluralName: 'lesson-quizs';
    singularName: 'lesson-quiz';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isSiyavula: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-quiz.lesson-quiz'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    questions: Schema.Attribute.DynamicZone<
      [
        'shared.single-choice-quiz',
        'shared.multiple-choice-quiz',
        'shared.free-choice',
      ]
    >;
    siyavulaActivityIds: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonSurveyLessonSurvey
  extends Struct.CollectionTypeSchema {
  collectionName: 'lesson_surveys';
  info: {
    displayName: 'Lesson Survey';
    pluralName: 'lesson-surveys';
    singularName: 'lesson-survey';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson-survey.lesson-survey'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    questions: Schema.Attribute.DynamicZone<
      [
        'shared.single-choice-quiz',
        'shared.single-answer',
        'shared.multiple-choice-quiz',
        'shared.free-choice',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLessonLesson extends Struct.CollectionTypeSchema {
  collectionName: 'lessons';
  info: {
    description: '';
    displayName: 'Lesson';
    pluralName: 'lessons';
    singularName: 'lesson';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assignments: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-assignment.lesson-assignment'
    >;
    audios: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-audio.lesson-audio'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    downloadResources: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    duration: Schema.Attribute.Integer;
    endDate: Schema.Attribute.DateTime;
    featuredImage: Schema.Attribute.Media<'images'>;
    grades: Schema.Attribute.Relation<'manyToMany', 'api::grade.grade'>;
    hasComment: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hasRating: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hasReview: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isLiveLesson: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lesson.lesson'
    > &
      Schema.Attribute.Private;
    modules: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-module.lesson-module'
    >;
    name: Schema.Attribute.String;
    notes: Schema.Attribute.Blocks;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    overview: Schema.Attribute.Blocks;
    presenter: Schema.Attribute.String;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    provinces: Schema.Attribute.Relation<
      'manyToMany',
      'api::province.province'
    >;
    publishedAt: Schema.Attribute.DateTime;
    quizes: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-quiz.lesson-quiz'
    >;
    requiredLesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    resources: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    social: Schema.Attribute.Relation<'oneToOne', 'api::social.social'>;
    startDate: Schema.Attribute.DateTime;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    subject_category: Schema.Attribute.Relation<
      'oneToOne',
      'api::subject-category.subject-category'
    >;
    surveys: Schema.Attribute.Relation<
      'manyToMany',
      'api::lesson-survey.lesson-survey'
    >;
    topic: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    zoom: Schema.Attribute.Relation<'oneToOne', 'api::zoom.zoom'>;
  };
}

export interface ApiLikeLike extends Struct.CollectionTypeSchema {
  collectionName: 'likes';
  info: {
    displayName: 'Like';
    pluralName: 'likes';
    singularName: 'like';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emoticon: Schema.Attribute.Relation<'oneToOne', 'api::emoticon.emoticon'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::like.like'> &
      Schema.Attribute.Private;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    social: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNotificationResponseNotificationResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'notification_responses';
  info: {
    displayName: 'Notification Response';
    pluralName: 'notification-responses';
    singularName: 'notification-response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification-response.notification-response'
    > &
      Schema.Attribute.Private;
    notification: Schema.Attribute.Relation<
      'oneToOne',
      'api::notification.notification'
    >;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    read: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNotificationSubscriberNotificationSubscriber
  extends Struct.CollectionTypeSchema {
  collectionName: 'notification_subscribers';
  info: {
    displayName: 'Notification Subscriber';
    pluralName: 'notification-subscribers';
    singularName: 'notification-subscriber';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification-subscriber.notification-subscriber'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiNotificationNotification
  extends Struct.CollectionTypeSchema {
  collectionName: 'notifications';
  info: {
    displayName: 'Notification';
    pluralName: 'notifications';
    singularName: 'notification';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    body: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<
      ['info', 'warning', 'alert', 'success']
    > &
      Schema.Attribute.DefaultTo<'info'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOrganizationOrganization
  extends Struct.CollectionTypeSchema {
  collectionName: 'organizations';
  info: {
    displayName: 'Organization';
    pluralName: 'organizations';
    singularName: 'organization';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    appBg: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    appBgDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    componentBg: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    componentBgDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entityId: Schema.Attribute.String;
    favicon: Schema.Attribute.Media<'images'>;
    freemium: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    icon1: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    icon1Dark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    icon2: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    icon2Dark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::organization.organization'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'>;
    logoDark: Schema.Attribute.Media<'images'>;
    merchantId: Schema.Attribute.String;
    merchantKey: Schema.Attribute.String;
    name: Schema.Attribute.String;
    primaryColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    primaryColorDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    publishedAt: Schema.Attribute.DateTime;
    secondaryColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    secondaryColorDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    text: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    textDark: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vouchers: Schema.Attribute.Relation<'oneToMany', 'api::voucher.voucher'>;
  };
}

export interface ApiPageTrackPageTrack extends Struct.CollectionTypeSchema {
  collectionName: 'page_tracks';
  info: {
    displayName: 'Page Track';
    pluralName: 'page-tracks';
    singularName: 'page-track';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    action: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-track.page-track'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    time: Schema.Attribute.Decimal;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiParenRelationParenRelation
  extends Struct.CollectionTypeSchema {
  collectionName: 'paren_relations';
  info: {
    displayName: 'Paren Relation';
    pluralName: 'paren-relations';
    singularName: 'paren-relation';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::paren-relation.paren-relation'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiParentTitleParentTitle extends Struct.CollectionTypeSchema {
  collectionName: 'parent_titles';
  info: {
    displayName: 'Parent Title';
    pluralName: 'parent-titles';
    singularName: 'parent-title';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::parent-title.parent-title'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiParentParent extends Struct.CollectionTypeSchema {
  collectionName: 'parents';
  info: {
    description: '';
    displayName: 'Parent';
    pluralName: 'parents';
    singularName: 'parent';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email;
    firstName: Schema.Attribute.String;
    idnumber: Schema.Attribute.String;
    lastName: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::parent.parent'
    > &
      Schema.Attribute.Private;
    mobileNr: Schema.Attribute.String;
    parenRelation: Schema.Attribute.Relation<
      'oneToOne',
      'api::paren-relation.paren-relation'
    >;
    parentTitle: Schema.Attribute.Relation<
      'oneToOne',
      'api::parent-title.parent-title'
    >;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workNr: Schema.Attribute.String;
  };
}

export interface ApiProductCategoryProductCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'product_categories';
  info: {
    displayName: 'Product Category';
    pluralName: 'product-categories';
    singularName: 'product-category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product-category.product-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
  collectionName: 'products';
  info: {
    displayName: 'Product';
    pluralName: 'products';
    singularName: 'product';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    productCategories: Schema.Attribute.Relation<
      'manyToMany',
      'api::product-category.product-category'
    >;
    productCustomField: Schema.Attribute.Component<'shared.custom-field', true>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
  };
}

export interface ApiProfileProfile extends Struct.CollectionTypeSchema {
  collectionName: 'profiles';
  info: {
    description: '';
    displayName: 'Profile';
    pluralName: 'profiles';
    singularName: 'profile';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    about: Schema.Attribute.Blocks;
    addresses: Schema.Attribute.Relation<'oneToMany', 'api::address.address'>;
    banner: Schema.Attribute.Media<'images'>;
    cancelDate: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    darkMode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    dob: Schema.Attribute.Date & Schema.Attribute.DefaultTo<'2000-01-01'>;
    documents: Schema.Attribute.Media<'images' | 'videos', true>;
    examNumber: Schema.Attribute.String;
    firstName: Schema.Attribute.String;
    gender: Schema.Attribute.Relation<'oneToOne', 'api::gender.gender'>;
    grades: Schema.Attribute.Relation<'manyToMany', 'api::grade.grade'>;
    hasSiyavulaAccess: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    idNumber: Schema.Attribute.String;
    imei: Schema.Attribute.String;
    inMailsBCC: Schema.Attribute.Relation<'manyToMany', 'api::in-mail.in-mail'>;
    inMailsCC: Schema.Attribute.Relation<'manyToMany', 'api::in-mail.in-mail'>;
    inMailsTos: Schema.Attribute.Relation<'manyToMany', 'api::in-mail.in-mail'>;
    isAffiliate: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isDeveloper: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPaying: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPayingDate: Schema.Attribute.DateTime &
      Schema.Attribute.DefaultTo<'2024-10-22T22:00:00.000Z'>;
    lastName: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::profile.profile'
    > &
      Schema.Attribute.Private;
    mobileNr: Schema.Attribute.String;
    notifications: Schema.Attribute.Relation<
      'manyToMany',
      'api::notification.notification'
    >;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    parents: Schema.Attribute.Relation<'manyToMany', 'api::parent.parent'>;
    profilePic: Schema.Attribute.Media<'images'>;
    progresses: Schema.Attribute.Relation<
      'oneToMany',
      'api::progress.progress'
    >;
    provinces: Schema.Attribute.Relation<
      'manyToMany',
      'api::province.province'
    >;
    publishedAt: Schema.Attribute.DateTime;
    referral: Schema.Attribute.Relation<'oneToOne', 'api::affiliate.affiliate'>;
    schools: Schema.Attribute.Relation<'manyToMany', 'api::school.school'>;
    serialNumber: Schema.Attribute.String;
    shares: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    socialRead: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    subjects: Schema.Attribute.Relation<'manyToMany', 'api::subject.subject'>;
    supportDepartments: Schema.Attribute.Relation<
      'manyToMany',
      'api::support-department.support-department'
    >;
    uniqueId: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    voucher: Schema.Attribute.Relation<'oneToOne', 'api::voucher.voucher'>;
  };
}

export interface ApiProgressProgress extends Struct.CollectionTypeSchema {
  collectionName: 'progresses';
  info: {
    description: '';
    displayName: 'Progress';
    pluralName: 'progresses';
    singularName: 'progress';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    completedSteps: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    grade: Schema.Attribute.Relation<'oneToOne', 'api::grade.grade'>;
    isComplete: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::progress.progress'
    > &
      Schema.Attribute.Private;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    profile: Schema.Attribute.Relation<'manyToOne', 'api::profile.profile'>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    school: Schema.Attribute.Relation<'oneToOne', 'api::school.school'>;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    timeSpent: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    totalSteps: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiProvinceProvince extends Struct.CollectionTypeSchema {
  collectionName: 'provinces';
  info: {
    displayName: 'Province';
    pluralName: 'provinces';
    singularName: 'province';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    country: Schema.Attribute.Relation<'oneToOne', 'api::country.country'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    lessons: Schema.Attribute.Relation<'manyToMany', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::province.province'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    regions: Schema.Attribute.Relation<'oneToMany', 'api::region.region'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiQualificationResponseQualificationResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'qualification_responses';
  info: {
    displayName: 'Qualification Response';
    pluralName: 'qualification-responses';
    singularName: 'qualification-response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    applied: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isSaved: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::qualification-response.qualification-response'
    > &
      Schema.Attribute.Private;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    qualification: Schema.Attribute.Relation<
      'oneToOne',
      'api::qualification.qualification'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiQualificationQualification
  extends Struct.CollectionTypeSchema {
  collectionName: 'qualifications';
  info: {
    description: '';
    displayName: 'Qualification';
    pluralName: 'qualifications';
    singularName: 'qualification';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    closeDate: Schema.Attribute.Date;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    degree: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    duration: Schema.Attribute.String;
    faculty: Schema.Attribute.Relation<'manyToOne', 'api::faculty.faculty'>;
    hashtags: Schema.Attribute.String;
    institute: Schema.Attribute.Relation<
      'oneToOne',
      'api::institute.institute'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::qualification.qualification'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    openDate: Schema.Attribute.Date;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    programmDescription: Schema.Attribute.Blocks;
    publishedAt: Schema.Attribute.DateTime;
    requirements: Schema.Attribute.Blocks;
    shortDescription: Schema.Attribute.Blocks;
    subjects: Schema.Attribute.Relation<'manyToMany', 'api::subject.subject'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
  };
}

export interface ApiQueryBaseQueryBase extends Struct.CollectionTypeSchema {
  collectionName: 'query_bases';
  info: {
    description: '';
    displayName: 'Query Base';
    pluralName: 'query-bases';
    singularName: 'query-base';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    baseQuery: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-base.query-base'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    query_type: Schema.Attribute.Relation<
      'oneToOne',
      'api::query-type.query-type'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiQueryFilterQueryFilter extends Struct.CollectionTypeSchema {
  collectionName: 'query_filters';
  info: {
    displayName: 'Query Filter';
    pluralName: 'query-filters';
    singularName: 'query-filter';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-filter.query-filter'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    queryType: Schema.Attribute.Relation<
      'manyToOne',
      'api::query-type.query-type'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiQueryHeaderQueryHeader extends Struct.CollectionTypeSchema {
  collectionName: 'query_headers';
  info: {
    displayName: 'Query Header';
    pluralName: 'query-headers';
    singularName: 'query-header';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    display: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-header.query-header'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    queryStructures: Schema.Attribute.Relation<
      'manyToMany',
      'api::query-structure.query-structure'
    >;
    queryTypes: Schema.Attribute.Relation<
      'manyToMany',
      'api::query-type.query-type'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiQueryStructureQueryStructure
  extends Struct.CollectionTypeSchema {
  collectionName: 'query_structures';
  info: {
    displayName: 'Query Structure';
    pluralName: 'query-structures';
    singularName: 'query-structure';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    display: Schema.Attribute.String;
    field: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-structure.query-structure'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    queryHeaders: Schema.Attribute.Relation<
      'manyToMany',
      'api::query-header.query-header'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiQueryTypeQueryType extends Struct.CollectionTypeSchema {
  collectionName: 'query_types';
  info: {
    displayName: 'Query Type';
    pluralName: 'query-types';
    singularName: 'query-type';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-type.query-type'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    queryFilters: Schema.Attribute.Relation<
      'oneToMany',
      'api::query-filter.query-filter'
    >;
    queryHeaders: Schema.Attribute.Relation<
      'manyToMany',
      'api::query-header.query-header'
    >;
    table: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiQuizResponseQuizResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'quiz_responses';
  info: {
    displayName: 'Quiz Response';
    pluralName: 'quiz-responses';
    singularName: 'quiz-response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    answer: Schema.Attribute.DynamicZone<
      [
        'shared.multiple-choice-quiz',
        'shared.free-choice',
        'shared.single-choice-quiz',
      ]
    >;
    attempt: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isCompleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    lesson_quiz: Schema.Attribute.Relation<
      'oneToOne',
      'api::lesson-quiz.lesson-quiz'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::quiz-response.quiz-response'
    > &
      Schema.Attribute.Private;
    points: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    response: Schema.Attribute.JSON;
    totalPoints: Schema.Attribute.Decimal;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiRatingRating extends Struct.CollectionTypeSchema {
  collectionName: 'ratings';
  info: {
    displayName: 'Rating';
    pluralName: 'ratings';
    singularName: 'rating';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::rating.rating'
    > &
      Schema.Attribute.Private;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    social: Schema.Attribute.Relation<'manyToOne', 'api::social.social'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRegionRegion extends Struct.CollectionTypeSchema {
  collectionName: 'regions';
  info: {
    displayName: 'Region';
    pluralName: 'regions';
    singularName: 'region';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::region.region'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    province: Schema.Attribute.Relation<'manyToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRegisterPopUpRegisterPopUp
  extends Struct.CollectionTypeSchema {
  collectionName: 'register_pop_ups';
  info: {
    displayName: 'Register Pop Up';
    pluralName: 'register-pop-ups';
    singularName: 'register-pop-up';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::register-pop-up.register-pop-up'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
  };
}

export interface ApiSchoolSchool extends Struct.CollectionTypeSchema {
  collectionName: 'schools';
  info: {
    description: '';
    displayName: 'School';
    pluralName: 'schools';
    singularName: 'school';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    district: Schema.Attribute.Relation<'oneToOne', 'api::district.district'>;
    email: Schema.Attribute.Email;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::school.school'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    suburb: Schema.Attribute.Relation<'manyToOne', 'api::suburb.suburb'>;
    tellephone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiShowCategoryShowCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'show_categories';
  info: {
    displayName: 'Show Category';
    pluralName: 'show-categories';
    singularName: 'show-category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::show-category.show-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    shows: Schema.Attribute.Relation<'manyToMany', 'api::show.show'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiShowShow extends Struct.CollectionTypeSchema {
  collectionName: 'shows';
  info: {
    description: '';
    displayName: 'Show';
    pluralName: 'shows';
    singularName: 'show';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::show.show'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    show_categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::show-category.show-category'
    >;
    transcript: Schema.Attribute.Blocks;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
  };
}

export interface ApiSocialLinkSocialLink extends Struct.CollectionTypeSchema {
  collectionName: 'social_links';
  info: {
    displayName: 'Social Link';
    pluralName: 'social-links';
    singularName: 'social-link';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    icon: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-link.social-link'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
  };
}

export interface ApiSocialSocial extends Struct.CollectionTypeSchema {
  collectionName: 'socials';
  info: {
    description: '';
    displayName: 'Social';
    pluralName: 'socials';
    singularName: 'social';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
    comments: Schema.Attribute.Relation<'oneToMany', 'api::comment.comment'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    forum: Schema.Attribute.Relation<'oneToOne', 'api::forum.forum'>;
    knowledgeBase: Schema.Attribute.Relation<
      'oneToOne',
      'api::knowledge-base.knowledge-base'
    >;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    likes: Schema.Attribute.Relation<'oneToMany', 'api::like.like'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::social.social'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ratings: Schema.Attribute.Relation<'oneToMany', 'api::rating.rating'>;
    read: Schema.Attribute.Relation<'oneToMany', 'api::profile.profile'>;
    share: Schema.Attribute.Relation<'oneToMany', 'api::profile.profile'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiStepStep extends Struct.CollectionTypeSchema {
  collectionName: 'steps';
  info: {
    displayName: 'Step';
    pluralName: 'steps';
    singularName: 'step';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::step.step'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    steps: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSubjectCategorySubjectCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'subject_categories';
  info: {
    displayName: 'Subject Category';
    pluralName: 'subject-categories';
    singularName: 'subject-category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::subject-category.subject-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    subjects: Schema.Attribute.Relation<'manyToMany', 'api::subject.subject'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSubjectSubject extends Struct.CollectionTypeSchema {
  collectionName: 'subjects';
  info: {
    description: '';
    displayName: 'Subject';
    pluralName: 'subjects';
    singularName: 'subject';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    grades: Schema.Attribute.Relation<'manyToMany', 'api::grade.grade'>;
    icon: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::subject.subject'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    price: Schema.Attribute.Decimal;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    qualifications: Schema.Attribute.Relation<
      'manyToMany',
      'api::qualification.qualification'
    >;
    subjectCategories: Schema.Attribute.Relation<
      'manyToMany',
      'api::subject-category.subject-category'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSubscriptionSubscription
  extends Struct.CollectionTypeSchema {
  collectionName: 'subscriptions';
  info: {
    displayName: 'Subscription';
    pluralName: 'subscriptions';
    singularName: 'subscription';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::subscription.subscription'
    > &
      Schema.Attribute.Private;
    newsletterActive: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    smsActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSuburbSuburb extends Struct.CollectionTypeSchema {
  collectionName: 'suburbs';
  info: {
    description: '';
    displayName: 'Suburb';
    pluralName: 'suburbs';
    singularName: 'suburb';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    district: Schema.Attribute.Relation<'manyToOne', 'api::district.district'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::suburb.suburb'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    schools: Schema.Attribute.Relation<'oneToMany', 'api::school.school'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSupportCommentSupportComment
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_comments';
  info: {
    description: '';
    displayName: 'Support Comment';
    pluralName: 'support-comments';
    singularName: 'support-comment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    comment: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-comment.support-comment'
    > &
      Schema.Attribute.Private;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    support_ticket: Schema.Attribute.Relation<
      'manyToOne',
      'api::support-ticket.support-ticket'
    >;
    timeSpent: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSupportDepartmentSupportDepartment
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_departments';
  info: {
    displayName: 'Support Department';
    pluralName: 'support-departments';
    singularName: 'support-department';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-department.support-department'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    profiles: Schema.Attribute.Relation<'manyToMany', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSupportStatusSupportStatus
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_statuses';
  info: {
    displayName: 'Support Status';
    pluralName: 'support-statuses';
    singularName: 'support-status';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-status.support-status'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSupportTicketSupportTicket
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_tickets';
  info: {
    description: '';
    displayName: 'Support Ticket';
    pluralName: 'support-tickets';
    singularName: 'support-ticket';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assignedTo: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    attachments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    comments: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-comment.support-comment'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Blocks;
    device: Schema.Attribute.Blocks;
    grade: Schema.Attribute.Relation<'oneToOne', 'api::grade.grade'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-ticket.support-ticket'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    open: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    supportDepartment: Schema.Attribute.Relation<
      'oneToOne',
      'api::support-department.support-department'
    >;
    supportStatus: Schema.Attribute.Relation<
      'oneToOne',
      'api::support-status.support-status'
    >;
    supportTopic: Schema.Attribute.Relation<
      'oneToOne',
      'api::support-topic.support-topic'
    >;
    timeSpent: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
  };
}

export interface ApiSupportTopicSupportTopic
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_topics';
  info: {
    displayName: 'Support Topic';
    pluralName: 'support-topics';
    singularName: 'support-topic';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-topic.support-topic'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    support_department: Schema.Attribute.Relation<
      'oneToOne',
      'api::support-department.support-department'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSurveyResponseSurveyResponse
  extends Struct.CollectionTypeSchema {
  collectionName: 'survey_responses';
  info: {
    displayName: 'Survey Response';
    pluralName: 'survey-responses';
    singularName: 'survey-response';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    answer: Schema.Attribute.DynamicZone<
      [
        'shared.single-choice-quiz',
        'shared.multiple-choice-quiz',
        'shared.free-choice',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isCompleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    lessonSurvey: Schema.Attribute.Relation<
      'oneToOne',
      'api::lesson-survey.lesson-survey'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::survey-response.survey-response'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    response: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiTargetTarget extends Struct.CollectionTypeSchema {
  collectionName: 'targets';
  info: {
    description: '';
    displayName: 'Target';
    pluralName: 'targets';
    singularName: 'target';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    articles: Schema.Attribute.Relation<'manyToMany', 'api::article.article'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    feed: Schema.Attribute.Relation<'manyToOne', 'api::feed.feed'>;
    gender: Schema.Attribute.Relation<'oneToOne', 'api::gender.gender'>;
    grade: Schema.Attribute.Relation<'oneToOne', 'api::grade.grade'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::target.target'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    school: Schema.Attribute.Relation<'oneToOne', 'api::school.school'>;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    subject_category: Schema.Attribute.Relation<
      'oneToOne',
      'api::subject-category.subject-category'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTimeTrackTimeTrack extends Struct.CollectionTypeSchema {
  collectionName: 'time_tracks';
  info: {
    description: '';
    displayName: 'Time Track';
    pluralName: 'time-tracks';
    singularName: 'time-track';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    duration: Schema.Attribute.BigInteger;
    from: Schema.Attribute.String;
    isComplete: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::time-track.time-track'
    > &
      Schema.Attribute.Private;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    to: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiTransactionEventTransactionEvent
  extends Struct.CollectionTypeSchema {
  collectionName: 'transaction_events';
  info: {
    displayName: 'Transaction Event';
    pluralName: 'transaction-events';
    singularName: 'transaction-event';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    amountFee: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    amountGross: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    amountNet: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    billingDate: Schema.Attribute.Date;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::transaction-event.transaction-event'
    > &
      Schema.Attribute.Private;
    paymentId: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    testmode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    transaction: Schema.Attribute.Relation<
      'oneToOne',
      'api::transaction.transaction'
    >;
    type: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTransactionTransaction extends Struct.CollectionTypeSchema {
  collectionName: 'transactions';
  info: {
    displayName: 'Transaction';
    pluralName: 'transactions';
    singularName: 'transaction';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    additionalInformation: Schema.Attribute.Blocks;
    addressLine1: Schema.Attribute.Blocks;
    affiliate: Schema.Attribute.Relation<
      'oneToOne',
      'api::affiliate.affiliate'
    >;
    amount: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    billingDate: Schema.Attribute.Date;
    cellnr: Schema.Attribute.String;
    company: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String;
    cycles: Schema.Attribute.Integer;
    description: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    emailBcc: Schema.Attribute.String;
    emailCc: Schema.Attribute.String;
    emailConfirmation: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    expiryTime: Schema.Attribute.Integer;
    firstName: Schema.Attribute.String;
    frequency: Schema.Attribute.Integer;
    item: Schema.Attribute.String;
    lastName: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::transaction.transaction'
    > &
      Schema.Attribute.Private;
    mPaymentId: Schema.Attribute.String;
    notes: Schema.Attribute.Blocks;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    password: Schema.Attribute.String;
    paymentMethod: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    province: Schema.Attribute.Relation<'oneToOne', 'api::province.province'>;
    publishedAt: Schema.Attribute.DateTime;
    recurringAmount: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    referral: Schema.Attribute.String;
    sendEmail: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    signature: Schema.Attribute.String;
    subscriptionType: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vatNr: Schema.Attribute.String;
  };
}

export interface ApiUserNoteUserNote extends Struct.CollectionTypeSchema {
  collectionName: 'user_notes';
  info: {
    description: '';
    displayName: 'User Note';
    pluralName: 'user-notes';
    singularName: 'user-note';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    lessonModule: Schema.Attribute.Relation<
      'oneToOne',
      'api::lesson-module.lesson-module'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::user-note.user-note'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    note: Schema.Attribute.Blocks;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    read: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    show: Schema.Attribute.Relation<'oneToOne', 'api::show.show'>;
    subject: Schema.Attribute.Relation<'oneToOne', 'api::subject.subject'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiVoucherVoucher extends Struct.CollectionTypeSchema {
  collectionName: 'vouchers';
  info: {
    displayName: 'Voucher';
    pluralName: 'vouchers';
    singularName: 'voucher';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    days: Schema.Attribute.Integer;
    discount: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    isUsed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::voucher.voucher'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    number: Schema.Attribute.String;
    organization: Schema.Attribute.Relation<
      'manyToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiZoomLessonZoomLesson extends Struct.CollectionTypeSchema {
  collectionName: 'zoom_lessons';
  info: {
    displayName: 'Zoom Lesson';
    pluralName: 'zoom-lessons';
    singularName: 'zoom-lesson';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::zoom-lesson.zoom-lesson'
    > &
      Schema.Attribute.Private;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiZoomMeetingZoomMeeting extends Struct.CollectionTypeSchema {
  collectionName: 'zoom_meetings';
  info: {
    displayName: 'Zoom Meeting';
    pluralName: 'zoom-meetings';
    singularName: 'zoom-meeting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    host: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::zoom-meeting.zoom-meeting'
    > &
      Schema.Attribute.Private;
    meetingLink: Schema.Attribute.String;
    participants: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    zoom: Schema.Attribute.Relation<'oneToOne', 'api::zoom.zoom'>;
  };
}

export interface ApiZoomZoom extends Struct.CollectionTypeSchema {
  collectionName: 'zooms';
  info: {
    displayName: 'Zoom';
    pluralName: 'zooms';
    singularName: 'zoom';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    access: Schema.Attribute.Relation<'oneToOne', 'api::access.access'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email;
    key: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::zoom.zoom'> &
      Schema.Attribute.Private;
    organization: Schema.Attribute.Relation<
      'oneToOne',
      'api::organization.organization'
    >;
    publishedAt: Schema.Attribute.DateTime;
    sdkKey: Schema.Attribute.String;
    secret: Schema.Attribute.String;
    stsAccountId: Schema.Attribute.String;
    stsApiKey: Schema.Attribute.String;
    stsApiSecret: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assignmentReplies: Schema.Attribute.Relation<
      'manyToMany',
      'api::assignment-reply.assignment-reply'
    >;
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    profile: Schema.Attribute.Relation<'oneToOne', 'api::profile.profile'>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    zoomMeetings: Schema.Attribute.Relation<
      'manyToMany',
      'api::zoom-meeting.zoom-meeting'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::access.access': ApiAccessAccess;
      'api::address.address': ApiAddressAddress;
      'api::affiliate-detail.affiliate-detail': ApiAffiliateDetailAffiliateDetail;
      'api::affiliate-setting.affiliate-setting': ApiAffiliateSettingAffiliateSetting;
      'api::affiliate-status.affiliate-status': ApiAffiliateStatusAffiliateStatus;
      'api::affiliate-transaction.affiliate-transaction': ApiAffiliateTransactionAffiliateTransaction;
      'api::affiliate.affiliate': ApiAffiliateAffiliate;
      'api::application-category.application-category': ApiApplicationCategoryApplicationCategory;
      'api::application-company.application-company': ApiApplicationCompanyApplicationCompany;
      'api::application-response.application-response': ApiApplicationResponseApplicationResponse;
      'api::application.application': ApiApplicationApplication;
      'api::article-category.article-category': ApiArticleCategoryArticleCategory;
      'api::article-saved.article-saved': ApiArticleSavedArticleSaved;
      'api::article-tag.article-tag': ApiArticleTagArticleTag;
      'api::article.article': ApiArticleArticle;
      'api::assignment-reply.assignment-reply': ApiAssignmentReplyAssignmentReply;
      'api::audio-playlist.audio-playlist': ApiAudioPlaylistAudioPlaylist;
      'api::bursary-category.bursary-category': ApiBursaryCategoryBursaryCategory;
      'api::bursary-response.bursary-response': ApiBursaryResponseBursaryResponse;
      'api::bursary.bursary': ApiBursaryBursary;
      'api::comment.comment': ApiCommentComment;
      'api::country.country': ApiCountryCountry;
      'api::district.district': ApiDistrictDistrict;
      'api::email-list.email-list': ApiEmailListEmailList;
      'api::emoticon.emoticon': ApiEmoticonEmoticon;
      'api::event-response.event-response': ApiEventResponseEventResponse;
      'api::event.event': ApiEventEvent;
      'api::faculty.faculty': ApiFacultyFaculty;
      'api::faq-category.faq-category': ApiFaqCategoryFaqCategory;
      'api::faq.faq': ApiFaqFaq;
      'api::feed.feed': ApiFeedFeed;
      'api::forum.forum': ApiForumForum;
      'api::gender.gender': ApiGenderGender;
      'api::grade.grade': ApiGradeGrade;
      'api::history.history': ApiHistoryHistory;
      'api::in-mail-response.in-mail-response': ApiInMailResponseInMailResponse;
      'api::in-mail.in-mail': ApiInMailInMail;
      'api::info.info': ApiInfoInfo;
      'api::institute.institute': ApiInstituteInstitute;
      'api::invoice.invoice': ApiInvoiceInvoice;
      'api::job-application.job-application': ApiJobApplicationJobApplication;
      'api::kb-category.kb-category': ApiKbCategoryKbCategory;
      'api::kb-topic.kb-topic': ApiKbTopicKbTopic;
      'api::knowledge-base.knowledge-base': ApiKnowledgeBaseKnowledgeBase;
      'api::lesson-assignment.lesson-assignment': ApiLessonAssignmentLessonAssignment;
      'api::lesson-audio.lesson-audio': ApiLessonAudioLessonAudio;
      'api::lesson-module.lesson-module': ApiLessonModuleLessonModule;
      'api::lesson-quiz.lesson-quiz': ApiLessonQuizLessonQuiz;
      'api::lesson-survey.lesson-survey': ApiLessonSurveyLessonSurvey;
      'api::lesson.lesson': ApiLessonLesson;
      'api::like.like': ApiLikeLike;
      'api::notification-response.notification-response': ApiNotificationResponseNotificationResponse;
      'api::notification-subscriber.notification-subscriber': ApiNotificationSubscriberNotificationSubscriber;
      'api::notification.notification': ApiNotificationNotification;
      'api::organization.organization': ApiOrganizationOrganization;
      'api::page-track.page-track': ApiPageTrackPageTrack;
      'api::paren-relation.paren-relation': ApiParenRelationParenRelation;
      'api::parent-title.parent-title': ApiParentTitleParentTitle;
      'api::parent.parent': ApiParentParent;
      'api::product-category.product-category': ApiProductCategoryProductCategory;
      'api::product.product': ApiProductProduct;
      'api::profile.profile': ApiProfileProfile;
      'api::progress.progress': ApiProgressProgress;
      'api::province.province': ApiProvinceProvince;
      'api::qualification-response.qualification-response': ApiQualificationResponseQualificationResponse;
      'api::qualification.qualification': ApiQualificationQualification;
      'api::query-base.query-base': ApiQueryBaseQueryBase;
      'api::query-filter.query-filter': ApiQueryFilterQueryFilter;
      'api::query-header.query-header': ApiQueryHeaderQueryHeader;
      'api::query-structure.query-structure': ApiQueryStructureQueryStructure;
      'api::query-type.query-type': ApiQueryTypeQueryType;
      'api::quiz-response.quiz-response': ApiQuizResponseQuizResponse;
      'api::rating.rating': ApiRatingRating;
      'api::region.region': ApiRegionRegion;
      'api::register-pop-up.register-pop-up': ApiRegisterPopUpRegisterPopUp;
      'api::school.school': ApiSchoolSchool;
      'api::show-category.show-category': ApiShowCategoryShowCategory;
      'api::show.show': ApiShowShow;
      'api::social-link.social-link': ApiSocialLinkSocialLink;
      'api::social.social': ApiSocialSocial;
      'api::step.step': ApiStepStep;
      'api::subject-category.subject-category': ApiSubjectCategorySubjectCategory;
      'api::subject.subject': ApiSubjectSubject;
      'api::subscription.subscription': ApiSubscriptionSubscription;
      'api::suburb.suburb': ApiSuburbSuburb;
      'api::support-comment.support-comment': ApiSupportCommentSupportComment;
      'api::support-department.support-department': ApiSupportDepartmentSupportDepartment;
      'api::support-status.support-status': ApiSupportStatusSupportStatus;
      'api::support-ticket.support-ticket': ApiSupportTicketSupportTicket;
      'api::support-topic.support-topic': ApiSupportTopicSupportTopic;
      'api::survey-response.survey-response': ApiSurveyResponseSurveyResponse;
      'api::target.target': ApiTargetTarget;
      'api::time-track.time-track': ApiTimeTrackTimeTrack;
      'api::transaction-event.transaction-event': ApiTransactionEventTransactionEvent;
      'api::transaction.transaction': ApiTransactionTransaction;
      'api::user-note.user-note': ApiUserNoteUserNote;
      'api::voucher.voucher': ApiVoucherVoucher;
      'api::zoom-lesson.zoom-lesson': ApiZoomLessonZoomLesson;
      'api::zoom-meeting.zoom-meeting': ApiZoomMeetingZoomMeeting;
      'api::zoom.zoom': ApiZoomZoom;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
