export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type AdCategoryType = {
  __typename?: 'AdCategoryType';
  /** Parent category if any */
  category?: Maybe<Scalars['String']>;
  /** Number of products, listings */
  count?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AdPrices = {
  __typename?: 'AdPrices';
  price?: Maybe<Scalars['String']>;
  /** escrow | xxxxxxx | xxxxx  */
  type?: Maybe<Scalars['String']>;
};

export type AdPricesInput = {
  price?: InputMaybe<Scalars['String']>;
  /** escrow | xxxxxxx | xxxxx  */
  type?: InputMaybe<Scalars['String']>;
};

export type AdsListingOutput = {
  __typename?: 'AdsListingOutput';
  adId?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  availability?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  env?: Maybe<Scalars['String']>;
  ethnicity?: Maybe<Scalars['String']>;
  eye?: Maybe<Scalars['String']>;
  geo?: Maybe<GeoType>;
  hair?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  info?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderType?: Maybe<Scalars['String']>;
  owner?: Maybe<UserType>;
  paid?: Maybe<Scalars['Boolean']>;
  phone?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Scalars['String']>>;
  price?: Maybe<Scalars['Float']>;
  prices?: Maybe<Array<AdPrices>>;
  ratings?: Maybe<Scalars['Float']>;
  ratingsCount?: Maybe<Scalars['Float']>;
  refUrl?: Maybe<Scalars['String']>;
  reviewsCount?: Maybe<Scalars['Float']>;
  salesCount?: Maybe<Scalars['Float']>;
  shipsFrom?: Maybe<Scalars['String']>;
  shipsTo?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subcategory?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  viewsCount?: Maybe<Scalars['Float']>;
  visible?: Maybe<Scalars['Boolean']>;
  weight?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

export type AdsListingOutputPagination = {
  __typename?: 'AdsListingOutputPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<AdsListingOutput>>;
  params?: Maybe<Scalars['JSON']>;
};

export type AdsListingType = {
  __typename?: 'AdsListingType';
  adId?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  availability?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  env?: Maybe<Scalars['String']>;
  ethnicity?: Maybe<Scalars['String']>;
  eye?: Maybe<Scalars['String']>;
  geo?: Maybe<GeoType>;
  hair?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  info?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderType?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  paid?: Maybe<Scalars['Boolean']>;
  phone?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Scalars['String']>>;
  price?: Maybe<Scalars['Float']>;
  prices?: Maybe<Array<AdPrices>>;
  ratings?: Maybe<Scalars['Float']>;
  ratingsCount?: Maybe<Scalars['Float']>;
  refUrl?: Maybe<Scalars['String']>;
  reviewsCount?: Maybe<Scalars['Float']>;
  salesCount?: Maybe<Scalars['Float']>;
  shipsFrom?: Maybe<Scalars['String']>;
  shipsTo?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subcategory?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  viewsCount?: Maybe<Scalars['Float']>;
  visible?: Maybe<Scalars['Boolean']>;
  weight?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

export type AdsListingTypeInput = {
  adId?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  age?: InputMaybe<Scalars['Float']>;
  availability?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  env?: InputMaybe<Scalars['String']>;
  ethnicity?: InputMaybe<Scalars['String']>;
  eye?: InputMaybe<Scalars['String']>;
  geo?: InputMaybe<GeoTypeInput>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  info?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orderType?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  photos?: InputMaybe<Array<Scalars['String']>>;
  price?: InputMaybe<Scalars['Float']>;
  prices?: InputMaybe<Array<AdPricesInput>>;
  ratings?: InputMaybe<Scalars['Float']>;
  ratingsCount?: InputMaybe<Scalars['Float']>;
  refUrl?: InputMaybe<Scalars['String']>;
  reviewsCount?: InputMaybe<Scalars['Float']>;
  salesCount?: InputMaybe<Scalars['Float']>;
  shipsFrom?: InputMaybe<Scalars['String']>;
  shipsTo?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  subcategory?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  viewsCount?: InputMaybe<Scalars['Float']>;
  visible?: InputMaybe<Scalars['Boolean']>;
  weight?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type AdsListingTypePagination = {
  __typename?: 'AdsListingTypePagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<AdsListingType>>;
  params?: Maybe<Scalars['JSON']>;
};

export type AuthResType = {
  __typename?: 'AuthResType';
  data?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Badge = {
  __typename?: 'Badge';
  /** Counts */
  count?: Maybe<Scalars['Float']>;
  /** ID of the badge */
  id?: Maybe<Scalars['String']>;
  /** The model for this badge */
  model?: Maybe<Scalars['String']>;
  /** The owner of the account */
  owner?: Maybe<Scalars['String']>;
};

export type ChatAttachmentType = {
  __typename?: 'ChatAttachmentType';
  createdAt?: Maybe<Scalars['DateTime']>;
  encoding?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  messageId?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
};

export type ChatConvo = {
  __typename?: 'ChatConvo';
  avatar?: Maybe<Scalars['String']>;
  convoId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  group?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  lastMessage?: Maybe<ChatMessageType>;
  members?: Maybe<Array<ChatUserType>>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<ChatUserType>;
  public?: Maybe<Scalars['Boolean']>;
  source?: Maybe<Scalars['JSON']>;
  sourceId?: Maybe<Scalars['String']>;
  sourceType?: Maybe<Scalars['String']>;
  unread?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChatConvoInput = {
  avatar?: InputMaybe<Scalars['String']>;
  convoId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  group?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  lastMessage?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  sourceId?: InputMaybe<Scalars['String']>;
  sourceType?: InputMaybe<Scalars['String']>;
  unread?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatConvoPagination = {
  __typename?: 'ChatConvoPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<ChatConvo>>;
  params?: Maybe<Scalars['JSON']>;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  attachments?: Maybe<Array<ChatAttachmentType>>;
  convoId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  owner?: Maybe<ChatUserType>;
  system?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChatMessageInput = {
  attachments?: InputMaybe<Scalars['String']>;
  convoId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  system?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatMessagePagination = {
  __typename?: 'ChatMessagePagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<ChatMessage>>;
  params?: Maybe<Scalars['JSON']>;
};

export type ChatMessageType = {
  __typename?: 'ChatMessageType';
  attachments?: Maybe<Scalars['String']>;
  convoId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  system?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChatResType = {
  __typename?: 'ChatResType';
  data?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ChatUserType = {
  __typename?: 'ChatUserType';
  address?: Maybe<Scalars['String']>;
  admin?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['Float']>;
  bio?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  plans?: Maybe<Array<Scalars['String']>>;
  tokenVersion?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type CityType = {
  __typename?: 'CityType';
  countryCode?: Maybe<Scalars['String']>;
  isoCode?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  stateCode?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  editedAt?: Maybe<Scalars['DateTime']>;
  /** The account that posted this */
  owner?: Maybe<Scalars['String']>;
  /** Replied to parent comment */
  parentId?: Maybe<Scalars['String']>;
  /** HTML code WYSIWYG editor or some markdown */
  text?: Maybe<Scalars['String']>;
};

export type CommentInput = {
  editedAt?: InputMaybe<Scalars['DateTime']>;
  /** The account that posted this */
  owner?: InputMaybe<Scalars['String']>;
  /** Replied to parent comment */
  parentId?: InputMaybe<Scalars['String']>;
  /** HTML code WYSIWYG editor or some markdown */
  text?: InputMaybe<Scalars['String']>;
};

export type CountryType = {
  __typename?: 'CountryType';
  currency?: Maybe<Scalars['String']>;
  flag?: Maybe<Scalars['String']>;
  isoCode?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phonecode?: Maybe<Scalars['String']>;
  timezones?: Maybe<Array<TimezoneType>>;
};

export type DisputeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  seller?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DisputeOutput = {
  __typename?: 'DisputeOutput';
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  /** Order */
  order?: Maybe<OrderType>;
  /** Owner */
  owner?: Maybe<UserType>;
  reason?: Maybe<Scalars['String']>;
  /** Seller */
  seller?: Maybe<UserType>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DisputeOutputPagination = {
  __typename?: 'DisputeOutputPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<DisputeOutput>>;
  params?: Maybe<Scalars['JSON']>;
};

export type FeePrices = {
  __typename?: 'FeePrices';
  checkoutFeePerc: Scalars['Float'];
  withdrawFeePerc: Scalars['Float'];
  withdrawMin: WithdrawMin;
};

export type FeePricesInput = {
  checkoutFeePerc: Scalars['Float'];
  withdrawFeePerc: Scalars['Float'];
  withdrawMin: WithdrawMinInput;
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  accessToken?: Maybe<Scalars['String']>;
  /** 2 auth enabled */
  auth2?: Maybe<Scalars['Boolean']>;
  codeId?: Maybe<Scalars['String']>;
  encryptedCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  useMnemonic?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserType>;
  userId?: Maybe<Scalars['String']>;
};

export type GeoType = {
  __typename?: 'GeoType';
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
};

export type GeoTypeInput = {
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  /** 2 auth enabled */
  auth2?: Maybe<Scalars['Boolean']>;
  codeId?: Maybe<Scalars['String']>;
  encryptedCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<UserType>;
};

export type LoginResponseType = {
  __typename?: 'LoginResponseType';
  accessToken?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewKey: ResType;
  adsListingTypeCreate: AdsListingTypeResType;
  adsListingTypeDelete: AdsListingTypeResType;
  cancelDispute: ResType;
  cancelOrder: ResType;
  cancelWithdrawRequest: ResType;
  changeVisibilityAdListing: ResType;
  checkUsername: AuthResType;
  checkoutOrder?: Maybe<ResType>;
  commentCreate: CommentResType;
  commentDelete: CommentResType;
  /** Admin can confirm or reject dispute */
  confirmDispute: ResType;
  confirmOrder: ResType;
  /** Admin can confirm or reject withdraw request */
  confirmWithdrawRequest: ResType;
  createAdListing: ResType;
  createChatConvo: ChatResType;
  createChatMessage: ChatResType;
  createDispute?: Maybe<ResType>;
  createVendor: ResType;
  createWithdrawRequestByWallet?: Maybe<ResType>;
  deleteAdListing?: Maybe<ResType>;
  /** Admin can finalize or reject dispute */
  finalizeDispute: ResType;
  finalizeOrder: ResType;
  forgotPassword: ForgotPasswordResponse;
  forgotPasswordConfirm: ResType;
  getWalletAddress: ResType;
  login: LoginResponse;
  login2Auth: LoginResponse;
  logout: Scalars['Boolean'];
  passwordChange: PasswordChangeResponse;
  passwordChangeConfirm: ResType;
  passwordLogin: LoginResponseType;
  passwordReset: LoginResponse;
  phoneLogin: LoginResponseType;
  postChangeVisibility: SocialResType;
  postCreate: SocialResType;
  postDelete: SocialResType;
  rateOrder?: Maybe<ResType>;
  reactionCreate: ReactionResType;
  reactionDelete: ReactionResType;
  revokeRefreshTokenForUser: AuthResType;
  signup: SignUpResponse;
  startConvo: ChatResType;
  transactionCreate: TransactionResType;
  transactionDelete: TransactionResType;
  updateOrderTracking: ResType;
  updateSiteSettings: ResType;
  updateUserProfile: AuthResType;
  updateVendor: ResType;
  verifyNewKey: ResType;
  verifyOrder: ResType;
};


export type MutationAddNewKeyArgs = {
  publicKey: Scalars['String'];
};


export type MutationAdsListingTypeCreateArgs = {
  args: AdsListingTypeInput;
};


export type MutationAdsListingTypeDeleteArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
};


export type MutationCancelDisputeArgs = {
  id: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationCancelOrderArgs = {
  id: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationCancelWithdrawRequestArgs = {
  id: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationChangeVisibilityAdListingArgs = {
  id: Scalars['String'];
  owner: Scalars['String'];
  visible: Scalars['Boolean'];
};


export type MutationCheckUsernameArgs = {
  username: Scalars['String'];
};


export type MutationCheckoutOrderArgs = {
  order: OrderTypeInput;
  walletId: Scalars['String'];
};


export type MutationCommentCreateArgs = {
  args: CommentInput;
};


export type MutationCommentDeleteArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
};


export type MutationConfirmDisputeArgs = {
  confirm?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationConfirmOrderArgs = {
  confirm?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationConfirmWithdrawRequestArgs = {
  confirm?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationCreateAdListingArgs = {
  args: AdsListingTypeInput;
};


export type MutationCreateChatConvoArgs = {
  args?: InputMaybe<ChatConvoInput>;
};


export type MutationCreateChatMessageArgs = {
  args: ChatMessageInput;
};


export type MutationCreateDisputeArgs = {
  args: DisputeInput;
};


export type MutationCreateWithdrawRequestByWalletArgs = {
  args: WithdrawRequestInput;
};


export type MutationDeleteAdListingArgs = {
  id: Scalars['String'];
};


export type MutationFinalizeDisputeArgs = {
  confirm?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
};


export type MutationFinalizeOrderArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  username: Scalars['String'];
};


export type MutationForgotPasswordConfirmArgs = {
  codeId?: InputMaybe<Scalars['String']>;
  confirmCode?: InputMaybe<Scalars['String']>;
  mnemonic?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationGetWalletAddressArgs = {
  currency: Scalars['String'];
  forceGenerate?: InputMaybe<Scalars['Boolean']>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLogin2AuthArgs = {
  codeId: Scalars['String'];
  confirmCode: Scalars['String'];
};


export type MutationPasswordChangeConfirmArgs = {
  codeId?: InputMaybe<Scalars['String']>;
  confirmCode?: InputMaybe<Scalars['String']>;
  mnemonic?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationPasswordLoginArgs = {
  createNew: Scalars['Boolean'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  codeId?: InputMaybe<Scalars['String']>;
  confirmCode?: InputMaybe<Scalars['String']>;
  mnemonic?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationPhoneLoginArgs = {
  createNew?: InputMaybe<Scalars['Boolean']>;
  firebaseToken: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationPostChangeVisibilityArgs = {
  id: Scalars['String'];
  visibility: Scalars['String'];
};


export type MutationPostCreateArgs = {
  args?: InputMaybe<PostInput>;
};


export type MutationPostDeleteArgs = {
  id: Scalars['String'];
};


export type MutationRateOrderArgs = {
  id: Scalars['String'];
  rating?: InputMaybe<Scalars['Float']>;
  review?: InputMaybe<Scalars['String']>;
};


export type MutationReactionCreateArgs = {
  args: ReactionInput;
};


export type MutationReactionDeleteArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
};


export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars['String'];
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationStartConvoArgs = {
  args?: InputMaybe<ChatConvoInput>;
};


export type MutationTransactionCreateArgs = {
  args: TransactionInput;
};


export type MutationTransactionDeleteArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateOrderTrackingArgs = {
  id: Scalars['String'];
  tracking: Scalars['String'];
};


export type MutationUpdateSiteSettingsArgs = {
  args?: InputMaybe<SiteSettingsInput>;
};


export type MutationUpdateUserProfileArgs = {
  user: UserTypeInput;
};


export type MutationUpdateVendorArgs = {
  vendor?: InputMaybe<VendorTypeInput>;
};


export type MutationVerifyNewKeyArgs = {
  codeId: Scalars['String'];
  confirmCode: Scalars['String'];
  newCodeId?: InputMaybe<Scalars['String']>;
  newConfirmCode?: InputMaybe<Scalars['String']>;
};


export type MutationVerifyOrderArgs = {
  orderCode: Scalars['String'];
  orderId: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  read?: Maybe<Scalars['Boolean']>;
  source?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type NotificationPagination = {
  __typename?: 'NotificationPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Notification>>;
  params?: Maybe<Scalars['JSON']>;
};

export type OnChatMessage = {
  __typename?: 'OnChatMessage';
  convoId?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['DateTime']>;
  typing?: Maybe<Scalars['String']>;
};

export type OrderRatingOutput = {
  __typename?: 'OrderRatingOutput';
  ad?: Maybe<AdsListingType>;
  buyer?: Maybe<UserType>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  order?: Maybe<OrderType>;
  orderId?: Maybe<Scalars['String']>;
  owner?: Maybe<UserType>;
  rating?: Maybe<Scalars['Float']>;
  review?: Maybe<Scalars['String']>;
  seller?: Maybe<UserType>;
  typeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderRatingOutputPagination = {
  __typename?: 'OrderRatingOutputPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<OrderRatingOutput>>;
  params?: Maybe<Scalars['JSON']>;
};

export type OrderRatingType = {
  __typename?: 'OrderRatingType';
  buyer?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  review?: Maybe<Scalars['String']>;
  seller?: Maybe<Scalars['String']>;
  typeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderType = {
  __typename?: 'OrderType';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  details?: Maybe<Scalars['String']>;
  escrow?: Maybe<Scalars['String']>;
  feePerc?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderType?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  ownerRating?: Maybe<Scalars['String']>;
  paid?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  reason?: Maybe<Scalars['String']>;
  seller?: Maybe<Scalars['String']>;
  sellerRating?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  tracking?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  typeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderTypeInput = {
  code?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  details?: InputMaybe<Scalars['String']>;
  escrow?: InputMaybe<Scalars['String']>;
  feePerc?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orderType?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  ownerRating?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Float']>;
  quantity?: InputMaybe<Scalars['Float']>;
  reason?: InputMaybe<Scalars['String']>;
  seller?: InputMaybe<Scalars['String']>;
  sellerRating?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  tracking?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  typeId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type OrderTypeOutput = {
  __typename?: 'OrderTypeOutput';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  details?: Maybe<Scalars['String']>;
  escrow?: Maybe<Scalars['String']>;
  feePerc?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderType?: Maybe<Scalars['String']>;
  /** Owner */
  owner?: Maybe<UserType>;
  /** Owner rating */
  ownerRating?: Maybe<OrderRatingType>;
  paid?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['Float']>;
  /** Product */
  product?: Maybe<AdsListingType>;
  quantity?: Maybe<Scalars['Float']>;
  reason?: Maybe<Scalars['String']>;
  /** Seller */
  seller?: Maybe<UserType>;
  /** Seller rating */
  sellerRating?: Maybe<OrderRatingType>;
  status?: Maybe<Scalars['String']>;
  tracking?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  typeId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderTypeOutputPagination = {
  __typename?: 'OrderTypeOutputPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<OrderTypeOutput>>;
  params?: Maybe<Scalars['JSON']>;
};

export type PairRate = {
  __typename?: 'PairRate';
  pair?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Float']>;
};

export type PasswordChangeResponse = {
  __typename?: 'PasswordChangeResponse';
  /** 2 auth enabled */
  auth2?: Maybe<Scalars['Boolean']>;
  codeId?: Maybe<Scalars['String']>;
  encryptedCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  useMnemonic?: Maybe<Scalars['Boolean']>;
};

export type PgpPublicKey = {
  __typename?: 'PgpPublicKey';
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  key: Scalars['String'];
  owner?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type Post = {
  __typename?: 'Post';
  attachments?: Maybe<Array<Scalars['String']>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  reactions?: Maybe<Scalars['Float']>;
  reply?: Maybe<Scalars['String']>;
  replyToId?: Maybe<Scalars['String']>;
  sensitive?: Maybe<Scalars['Boolean']>;
  spoilerText?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  visibility?: Maybe<Scalars['String']>;
};

export type PostInput = {
  attachments?: InputMaybe<Array<Scalars['String']>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  editedAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  owner: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
  reactions?: InputMaybe<Scalars['Float']>;
  reply?: InputMaybe<Scalars['String']>;
  replyToId?: InputMaybe<Scalars['String']>;
  sensitive?: InputMaybe<Scalars['Boolean']>;
  spoilerText?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  visibility?: InputMaybe<Scalars['String']>;
};

export type PostPagination = {
  __typename?: 'PostPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Post>>;
  params?: Maybe<Scalars['JSON']>;
};

export type Query = {
  __typename?: 'Query';
  adsListingTypeGet: AdsListingType;
  adsListingTypePagination: AdsListingTypePagination;
  allDisputes: DisputeOutputPagination;
  allSiteSettings: SiteSettings;
  allTransactions: Array<Transaction>;
  allWithdrawRequests: WithdrawRequestOutputPagination;
  chatConvo: ChatConvoPagination;
  chatConvoById: ChatConvo;
  chatConvoPublicById: ChatConvo;
  chatMessage: ChatMessagePagination;
  chatTyping: Scalars['Boolean'];
  commentGet: Comment;
  commentPagination: CommentPagination;
  disputeById?: Maybe<DisputeOutput>;
  fetchRates: Array<PairRate>;
  getAdCategories: Array<AdCategoryType>;
  getAdCategory: AdCategoryType;
  getAdListing?: Maybe<AdsListingOutput>;
  getAllCountries: Array<CountryType>;
  getBadges: Array<Badge>;
  getCSRFToken?: Maybe<Scalars['String']>;
  getCityByState: Array<CityType>;
  getFeePrices: FeePrices;
  getMoneyInEscrow?: Maybe<Scalars['Float']>;
  getNotification?: Maybe<Notification>;
  getOrderRating?: Maybe<OrderRatingType>;
  getOrderRatings: OrderRatingOutputPagination;
  getPgpKey?: Maybe<PgpPublicKey>;
  getSiteSettings: SiteSettings;
  getStateByCountry: Array<StateType>;
  getUser: Array<UserType>;
  getUserVendorAdsListing?: Maybe<UserVendorAdsListingPage>;
  getVendor?: Maybe<VendorType>;
  me: UserType;
  myAdListing: Array<AdsListingType>;
  myAds: AdsListingTypePagination;
  myDisputes: DisputeOutputPagination;
  myOrders: OrderTypeOutputPagination;
  myWallets?: Maybe<Array<WalletOutput>>;
  myWithdrawRequests: WithdrawRequestOutputPagination;
  notifications: NotificationPagination;
  onMapRegion: Array<AdsListingType>;
  orderById?: Maybe<OrderTypeOutput>;
  posts: PostPagination;
  reactionGet: Reaction;
  reactionPagination: ReactionPagination;
  readNotifications: Array<Notification>;
  searchAdListingPublic?: Maybe<AdsListingOutputPagination>;
  transactionById?: Maybe<Transaction>;
  transactionGet: Transaction;
  transactionPagination: TransactionPagination;
  transactions: TransactionPagination;
  withdrawRequestById?: Maybe<WithdrawRequestOutput>;
};


export type QueryAdsListingTypeGetArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
};


export type QueryAdsListingTypePaginationArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryAllDisputesArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryAllTransactionsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  owner?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryAllWithdrawRequestsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryChatConvoArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Float']>;
  owner: Scalars['String'];
};


export type QueryChatConvoByIdArgs = {
  id: Scalars['String'];
};


export type QueryChatConvoPublicByIdArgs = {
  id: Scalars['String'];
};


export type QueryChatMessageArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  convoId: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
};


export type QueryChatTypingArgs = {
  convoId: Scalars['String'];
  time?: InputMaybe<Scalars['DateTime']>;
};


export type QueryCommentGetArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
};


export type QueryCommentPaginationArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryDisputeByIdArgs = {
  id: Scalars['String'];
};


export type QueryFetchRatesArgs = {
  pairs: Scalars['String'];
};


export type QueryGetAdCategoryArgs = {
  id: Scalars['String'];
};


export type QueryGetAdListingArgs = {
  id: Scalars['String'];
};


export type QueryGetBadgesArgs = {
  models: Array<Scalars['String']>;
};


export type QueryGetCityByStateArgs = {
  countryCode: Scalars['String'];
  stateCode: Scalars['String'];
};


export type QueryGetNotificationArgs = {
  id: Scalars['String'];
};


export type QueryGetOrderRatingArgs = {
  orderId: Scalars['String'];
};


export type QueryGetOrderRatingsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filters?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryGetStateByCountryArgs = {
  countryCode: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetUserVendorAdsListingArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Float']>;
  username?: InputMaybe<Scalars['String']>;
};


export type QueryMyAdListingArgs = {
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  owner?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
};


export type QueryMyAdsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryMyDisputesArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryMyOrdersArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryMyWalletsArgs = {
  createNew?: InputMaybe<Scalars['Boolean']>;
  currency: Array<Scalars['String']>;
};


export type QueryMyWithdrawRequestsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryNotificationsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  read?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryOnMapRegionArgs = {
  env: Scalars['String'];
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  zoom?: InputMaybe<Scalars['Float']>;
};


export type QueryOrderByIdArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  owner?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryReactionGetArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
};


export type QueryReactionPaginationArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryReadNotificationsArgs = {
  before?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
};


export type QuerySearchAdListingPublicArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  env?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryTransactionByIdArgs = {
  id: Scalars['String'];
};


export type QueryTransactionGetArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
};


export type QueryTransactionPaginationArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filters?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryWithdrawRequestByIdArgs = {
  id: Scalars['String'];
};

export type Reaction = {
  __typename?: 'Reaction';
  /** The account that posted this */
  owner?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
  /** Reply to another post, just like a quote tweet */
  reaction?: Maybe<Scalars['String']>;
};

export type ReactionInput = {
  /** The account that posted this */
  owner?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
  /** Reply to another post, just like a quote tweet */
  reaction?: InputMaybe<Scalars['String']>;
};

export type ResType = {
  __typename?: 'ResType';
  data?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  accessToken?: Maybe<Scalars['String']>;
  /** 2 auth enabled */
  auth2?: Maybe<Scalars['Boolean']>;
  codeId?: Maybe<Scalars['String']>;
  encryptedCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  mnemonic?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<UserType>;
};

export type SiteSettings = {
  __typename?: 'SiteSettings';
  BTCPAYSERVER_BTC?: Maybe<Scalars['String']>;
  BTCPAYSERVER_CRON?: Maybe<Scalars['String']>;
  BTCPAYSERVER_CRON_ENABLED?: Maybe<Scalars['String']>;
  BTCPAYSERVER_URL?: Maybe<Scalars['String']>;
  BTC_WITHDRAW_MIN?: Maybe<Scalars['Float']>;
  CHECKOUT_FEE_PERC?: Maybe<Scalars['Float']>;
  ENABLE_BTC?: Maybe<Scalars['Boolean']>;
  ENABLE_PGP?: Maybe<Scalars['Boolean']>;
  ENABLE_XMPP?: Maybe<Scalars['Boolean']>;
  ENABLE_XMR?: Maybe<Scalars['Boolean']>;
  MONEROX_CRON?: Maybe<Scalars['String']>;
  MONEROX_URL?: Maybe<Scalars['String']>;
  MONEROX_WALLET?: Maybe<Scalars['String']>;
  PGP_PUBLIC_KEY?: Maybe<Scalars['String']>;
  WALLETS_DIR?: Maybe<Scalars['String']>;
  WALLET_PASSWORD?: Maybe<Scalars['String']>;
  WALLET_PATH?: Maybe<Scalars['String']>;
  WALLET_RPC_PASSWORD?: Maybe<Scalars['String']>;
  WALLET_RPC_URL?: Maybe<Scalars['String']>;
  WALLET_RPC_USER?: Maybe<Scalars['String']>;
  WITHDRAW_FEE_PERC?: Maybe<Scalars['Float']>;
  XMPP_HOST?: Maybe<Scalars['String']>;
  XMPP_JID?: Maybe<Scalars['String']>;
  XMPP_PASSWORD?: Maybe<Scalars['String']>;
  XMPP_PORT?: Maybe<Scalars['String']>;
  XMR_WITHDRAW_MIN?: Maybe<Scalars['Float']>;
  adCount?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  feePrices?: Maybe<FeePrices>;
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slogan?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
  userCount?: Maybe<Scalars['Float']>;
  vendorBond?: Maybe<Scalars['Float']>;
  vendorCount?: Maybe<Scalars['Float']>;
};

export type SiteSettingsInput = {
  BTCPAYSERVER_BTC?: InputMaybe<Scalars['String']>;
  BTCPAYSERVER_CRON?: InputMaybe<Scalars['String']>;
  BTCPAYSERVER_CRON_ENABLED?: InputMaybe<Scalars['String']>;
  BTCPAYSERVER_URL?: InputMaybe<Scalars['String']>;
  BTC_WITHDRAW_MIN?: InputMaybe<Scalars['Float']>;
  CHECKOUT_FEE_PERC?: InputMaybe<Scalars['Float']>;
  ENABLE_BTC?: InputMaybe<Scalars['Boolean']>;
  ENABLE_PGP?: InputMaybe<Scalars['Boolean']>;
  ENABLE_XMPP?: InputMaybe<Scalars['Boolean']>;
  ENABLE_XMR?: InputMaybe<Scalars['Boolean']>;
  MONEROX_CRON?: InputMaybe<Scalars['String']>;
  MONEROX_URL?: InputMaybe<Scalars['String']>;
  MONEROX_WALLET?: InputMaybe<Scalars['String']>;
  PGP_PUBLIC_KEY?: InputMaybe<Scalars['String']>;
  WALLETS_DIR?: InputMaybe<Scalars['String']>;
  WALLET_PASSWORD?: InputMaybe<Scalars['String']>;
  WALLET_PATH?: InputMaybe<Scalars['String']>;
  WALLET_RPC_PASSWORD?: InputMaybe<Scalars['String']>;
  WALLET_RPC_URL?: InputMaybe<Scalars['String']>;
  WALLET_RPC_USER?: InputMaybe<Scalars['String']>;
  WITHDRAW_FEE_PERC?: InputMaybe<Scalars['Float']>;
  XMPP_HOST?: InputMaybe<Scalars['String']>;
  XMPP_JID?: InputMaybe<Scalars['String']>;
  XMPP_PASSWORD?: InputMaybe<Scalars['String']>;
  XMPP_PORT?: InputMaybe<Scalars['String']>;
  XMR_WITHDRAW_MIN?: InputMaybe<Scalars['Float']>;
  adCount?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  feePrices?: InputMaybe<FeePricesInput>;
  id?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slogan?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<Scalars['String']>;
  userCount?: InputMaybe<Scalars['Float']>;
  vendorBond?: InputMaybe<Scalars['Float']>;
  vendorCount?: InputMaybe<Scalars['Float']>;
};

export type SocialResType = {
  __typename?: 'SocialResType';
  data?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type StateType = {
  __typename?: 'StateType';
  countryCode?: Maybe<Scalars['String']>;
  isoCode?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onChatMessage: OnChatMessage;
  onConvos: OnChatMessage;
};


export type SubscriptionOnChatMessageArgs = {
  convoId: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['DateTime']>;
};


export type SubscriptionOnConvosArgs = {
  owner: Scalars['String'];
  time?: InputMaybe<Scalars['DateTime']>;
};

export type TimezoneType = {
  __typename?: 'TimezoneType';
  abbreviation?: Maybe<Scalars['String']>;
  gmtOffset?: Maybe<Scalars['Float']>;
  gmtOffsetName?: Maybe<Scalars['String']>;
  tzName?: Maybe<Scalars['String']>;
  zoneName?: Maybe<Scalars['String']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  feePerc?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  /** hash of the transaction, if source = crypto wallet */
  transactionHash?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TransactionInput = {
  amount?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Scalars['String']>;
  feePerc?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  sourceId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  /** hash of the transaction, if source = crypto wallet */
  transactionHash?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TransactionPagination = {
  __typename?: 'TransactionPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Transaction>>;
  params?: Maybe<Scalars['JSON']>;
};

export type UserStats = {
  __typename?: 'UserStats';
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  orderCount?: Maybe<Scalars['Float']>;
  owner?: Maybe<Scalars['String']>;
  ratings?: Maybe<Scalars['Float']>;
  ratingsCount?: Maybe<Scalars['Float']>;
  spent?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  viewsCount?: Maybe<Scalars['Float']>;
};

export type UserType = {
  __typename?: 'UserType';
  address?: Maybe<Scalars['String']>;
  admin?: Maybe<Scalars['Boolean']>;
  auth2?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['Float']>;
  bio?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  mnemonicHash?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  plans?: Maybe<Array<Scalars['String']>>;
  state?: Maybe<Scalars['String']>;
  tokenVersion?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type UserTypeInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  coverImage?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type UserVendorAdsListing = {
  __typename?: 'UserVendorAdsListing';
  ads?: Maybe<Array<AdsListingType>>;
  store?: Maybe<VendorType>;
  user?: Maybe<UserType>;
  userstats?: Maybe<UserStats>;
};

export type UserVendorAdsListingPage = {
  __typename?: 'UserVendorAdsListingPage';
  hasNext?: Maybe<Scalars['Boolean']>;
  item?: Maybe<UserVendorAdsListing>;
};

export type VendorType = {
  __typename?: 'VendorType';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  ratings?: Maybe<Scalars['Float']>;
  ratingsCount?: Maybe<Scalars['Float']>;
  reviewsCount?: Maybe<Scalars['Float']>;
  salesCount?: Maybe<Scalars['Float']>;
  shipsFrom?: Maybe<Scalars['String']>;
  shipsTo?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  vacation?: Maybe<Scalars['Boolean']>;
  viewsCount?: Maybe<Scalars['Float']>;
};

export type VendorTypeInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  ratings?: InputMaybe<Scalars['Float']>;
  ratingsCount?: InputMaybe<Scalars['Float']>;
  reviewsCount?: InputMaybe<Scalars['Float']>;
  salesCount?: InputMaybe<Scalars['Float']>;
  shipsFrom?: InputMaybe<Scalars['String']>;
  shipsTo?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  vacation?: InputMaybe<Scalars['Boolean']>;
  viewsCount?: InputMaybe<Scalars['Float']>;
};

export type Wallet = {
  __typename?: 'Wallet';
  /** The address of the wallet */
  address?: Maybe<Scalars['String']>;
  /** Amount in this wallet */
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The currency of the wallet */
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  /** The owner of the account */
  owner: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type WalletAddress = {
  __typename?: 'WalletAddress';
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The currency of the wallet */
  currency?: Maybe<Scalars['String']>;
  /** The address of the wallet, on-chain address */
  id?: Maybe<Scalars['String']>;
  /** The owner of the account */
  owner?: Maybe<Scalars['String']>;
  /** The number of transactions received from this address */
  transactions?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type WalletOutput = {
  __typename?: 'WalletOutput';
  /** The address object of the wallet */
  address?: Maybe<WalletAddress>;
  /** Amount in this wallet */
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The currency of the wallet */
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  /** The owner object of the account */
  owner?: Maybe<UserType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type WithdrawMin = {
  __typename?: 'WithdrawMin';
  BTC: Scalars['Float'];
  XMR?: Maybe<Scalars['Float']>;
};

export type WithdrawMinInput = {
  BTC: Scalars['Float'];
  XMR?: InputMaybe<Scalars['Float']>;
};

export type WithdrawRequestInput = {
  amount?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  feePerc?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  receiver?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  /** Transaction hash if a crypto withdraw request */
  transactionHash?: InputMaybe<Scalars['String']>;
  /** Type of withdraw request crypto | bank | xxxx */
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** Wallet Id */
  walletId?: InputMaybe<Scalars['String']>;
};

export type WithdrawRequestOutput = {
  __typename?: 'WithdrawRequestOutput';
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  feePerc?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['String']>;
  /** Owner */
  owner?: Maybe<UserType>;
  reason?: Maybe<Scalars['String']>;
  receiver?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  /** Transaction hash if a crypto withdraw request */
  transactionHash?: Maybe<Scalars['String']>;
  /** Type of withdraw request crypto | bank | xxxx */
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** Wallet */
  wallet?: Maybe<Wallet>;
  /** Wallet Id */
  walletId?: Maybe<Scalars['String']>;
};

export type WithdrawRequestOutputPagination = {
  __typename?: 'WithdrawRequestOutputPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<WithdrawRequestOutput>>;
  params?: Maybe<Scalars['JSON']>;
};

export type AdsListingTypePagination = {
  __typename?: 'adsListingTypePagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<AdsListingType>>;
  params?: Maybe<Scalars['JSON']>;
};

export type AdsListingTypeResType = {
  __typename?: 'adsListingTypeResType';
  data?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CommentPagination = {
  __typename?: 'commentPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Comment>>;
  params?: Maybe<Scalars['JSON']>;
};

export type CommentResType = {
  __typename?: 'commentResType';
  data?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ReactionPagination = {
  __typename?: 'reactionPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Reaction>>;
  params?: Maybe<Scalars['JSON']>;
};

export type ReactionResType = {
  __typename?: 'reactionResType';
  data?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type TransactionPagination = {
  __typename?: 'transactionPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Transaction>>;
  params?: Maybe<Scalars['JSON']>;
};

export type TransactionResType = {
  __typename?: 'transactionResType';
  data?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};
