export type Maybe<T> = T | undefined;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
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

export type CreatePaymentResponse = {
  __typename?: 'CreatePaymentResponse';
  payment: NowPaymentsCreatePayment;
  transaction: Transaction;
};

export type FeePrices = {
  __typename?: 'FeePrices';
  checkoutFeePerc: Scalars['Float'];
  withdrawFeePerc: Scalars['Float'];
  withdrawMin: WithdrawMin;
};

export type FileStringInput = {
  filename?: InputMaybe<Scalars['String']>;
  mimetype?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
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

export type GetPaymentStatusResponse = {
  __typename?: 'GetPaymentStatusResponse';
  payment: NowPaymentsGetPaymentStatus;
  transaction: Transaction;
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

export type MarketData = {
  __typename?: 'MarketData';
  close?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  high?: Maybe<Scalars['Float']>;
  low?: Maybe<Scalars['Float']>;
  open?: Maybe<Scalars['Float']>;
  symbol?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['Float']>;
};

export type MediaDataType = {
  __typename?: 'MediaDataType';
  createdAt?: Maybe<Scalars['DateTime']>;
  encoding?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  /** The server where the file is stored, e.g fastdfs */
  server?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewKey: ResType;
  adsListingTypeCreate: AdsListingTypeResType;
  adsListingTypeDelete: AdsListingTypeResType;
  cancelOrder: ResType;
  cancelWithdrawRequest: ResType;
  changeVisibilityAdListing: ResType;
  checkUsername: AuthResType;
  checkoutOrder?: Maybe<ResType>;
  commentCreate: CommentResType;
  commentDelete: CommentResType;
  confirmOrder: ResType;
  /** Admin can confirm or reject withdraw request */
  confirmWithdrawRequest: ResType;
  createAdListing: ResType;
  createChatConvo: ChatResType;
  createChatMessage: ChatResType;
  createVendor: ResType;
  createWithdrawRequestByWallet?: Maybe<ResType>;
  deleteAdListing?: Maybe<ResType>;
  finalizeOrder: ResType;
  forgotPassword: ForgotPasswordResponse;
  forgotPasswordConfirm: ResType;
  getWalletAddress: ResType;
  login: LoginResponse;
  login2Auth: LoginResponse;
  logout: Scalars['Boolean'];
  nowPaymentsCreatePayment: CreatePaymentResponse;
  passwordChange: PasswordChangeResponse;
  passwordChangeConfirm: ResType;
  passwordLogin: LoginResponseType;
  passwordReset: LoginResponse;
  phoneLogin: LoginResponseType;
  postChangeVisibility: SocialResType;
  postCreate: SocialResType;
  postDelete: SocialResType;
  pushNotificationCreate: PushNotificationResType;
  pushNotificationDelete: PushNotificationResType;
  rateOrder?: Maybe<ResType>;
  reactionCreate: ReactionResType;
  reactionDelete: ReactionResType;
  revokeRefreshTokenForUser: AuthResType;
  signup: SignUpResponse;
  startConvo: ChatResType;
  stopTraining: ResType;
  transactionCreate: TransactionResType;
  transactionDelete: TransactionResType;
  updateOrderTracking: ResType;
  updateUserProfile: AuthResType;
  updateVendor: ResType;
  upload: Array<MediaDataType>;
  uploadFastdfs?: Maybe<Array<MediaDataType>>;
  uploadString: Array<MediaDataType>;
  uploadStringFastdfs?: Maybe<Array<MediaDataType>>;
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

export type MutationCreateWithdrawRequestByWalletArgs = {
  args: WithdrawRequestInput;
};

export type MutationDeleteAdListingArgs = {
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

export type MutationNowPaymentsCreatePaymentArgs = {
  amount: Scalars['Float'];
  order_description?: InputMaybe<Scalars['String']>;
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

export type MutationPushNotificationCreateArgs = {
  args: PushNotificationInput;
};

export type MutationPushNotificationDeleteArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
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

export type MutationStopTrainingArgs = {
  queueId: Scalars['String'];
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

export type MutationUpdateUserProfileArgs = {
  user: UserTypeInput;
};

export type MutationUpdateVendorArgs = {
  vendor?: InputMaybe<VendorTypeInput>;
};

export type MutationUploadArgs = {
  files: Array<Scalars['Upload']>;
};

export type MutationUploadFastdfsArgs = {
  files: Array<Scalars['Upload']>;
};

export type MutationUploadStringArgs = {
  files: Array<FileStringInput>;
};

export type MutationUploadStringFastdfsArgs = {
  files: Array<FileStringInput>;
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

export type NowPaymentsCreatePayment = {
  __typename?: 'NowPaymentsCreatePayment';
  created_at?: Maybe<Scalars['String']>;
  ipn_callback_url?: Maybe<Scalars['String']>;
  order_description?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  pay_address?: Maybe<Scalars['String']>;
  pay_amount?: Maybe<Scalars['Float']>;
  pay_currency?: Maybe<Scalars['String']>;
  payment_id?: Maybe<Scalars['Float']>;
  payment_status?: Maybe<Scalars['String']>;
  price_amount?: Maybe<Scalars['Float']>;
  price_currency?: Maybe<Scalars['String']>;
  purchase_id?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type NowPaymentsGetPaymentStatus = {
  __typename?: 'NowPaymentsGetPaymentStatus';
  actually_paid?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['String']>;
  order_description?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  outcome_amount?: Maybe<Scalars['Float']>;
  outcome_currency?: Maybe<Scalars['String']>;
  pay_address?: Maybe<Scalars['String']>;
  pay_amount?: Maybe<Scalars['Float']>;
  pay_currency?: Maybe<Scalars['String']>;
  payment_id?: Maybe<Scalars['Float']>;
  payment_status?: Maybe<Scalars['String']>;
  price_amount?: Maybe<Scalars['Float']>;
  price_currency?: Maybe<Scalars['String']>;
  purchase_id?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['String']>;
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

export type PushNotification = {
  __typename?: 'PushNotification';
  createdAt?: Maybe<Scalars['DateTime']>;
  cron?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  env?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  typeData?: Maybe<Scalars['JSON']>;
  typeId?: Maybe<Scalars['String']>;
  tz?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PushNotificationInput = {
  cron?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  typeData?: InputMaybe<Scalars['JSON']>;
  typeId?: InputMaybe<Scalars['String']>;
  tz?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  adsListingTypeGet: AdsListingType;
  adsListingTypePagination: AdsListingTypePagination;
  allTransactions: Array<Transaction>;
  allWithdrawRequests: WithdrawRequestOutputPagination;
  chatConvo: ChatConvoPagination;
  chatConvoById: ChatConvo;
  chatConvoPublicById: ChatConvo;
  chatMessage: ChatMessagePagination;
  chatTyping: Scalars['Boolean'];
  commentGet: Comment;
  commentPagination: CommentPagination;
  fetchRates: Array<PairRate>;
  getAdCategories: Array<AdCategoryType>;
  getAdCategory: AdCategoryType;
  getAdListing?: Maybe<AdsListingOutput>;
  getAllCountries: Array<CountryType>;
  getCSRFToken?: Maybe<Scalars['String']>;
  getCityByState: Array<CityType>;
  getFeePrices: FeePrices;
  getMarketData: Array<MarketData>;
  getMoneyInEscrow?: Maybe<Scalars['Float']>;
  getOrderRating?: Maybe<OrderRatingType>;
  getOrderRatings: OrderRatingOutputPagination;
  getPgpKey?: Maybe<PgpPublicKey>;
  getSiteSettings: SiteSettings;
  getStateByCountry: Array<StateType>;
  getTicker: TickerData;
  getTrainedResult: TrainedResults;
  getTrendingSymbols: Array<TrendingSymbols>;
  getUser: Array<UserType>;
  getUserVendorAdsListing?: Maybe<UserVendorAdsListingPage>;
  getVendor?: Maybe<VendorType>;
  me: UserType;
  myAdListing: Array<AdsListingType>;
  myAds: AdsListingTypePagination;
  myOrders: OrderTypeOutputPagination;
  myTrainedResults: TrainedResultsPagination;
  myWallets?: Maybe<Array<WalletOutput>>;
  myWithdrawRequests: WithdrawRequestOutputPagination;
  nowPaymentsGetStatus: GetPaymentStatusResponse;
  onMapRegion: Array<AdsListingType>;
  orderById?: Maybe<OrderTypeOutput>;
  posts: PostPagination;
  pushNotificationGet: PushNotification;
  pushNotificationPagination: PushNotificationPagination;
  reactionGet: Reaction;
  reactionPagination: ReactionPagination;
  searchAdListingPublic?: Maybe<AdsListingOutputPagination>;
  startTraining: ResType;
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

export type QueryFetchRatesArgs = {
  pairs: Scalars['String'];
};

export type QueryGetAdCategoryArgs = {
  id: Scalars['String'];
};

export type QueryGetAdListingArgs = {
  id: Scalars['String'];
};

export type QueryGetCityByStateArgs = {
  countryCode: Scalars['String'];
  stateCode: Scalars['String'];
};

export type QueryGetMarketDataArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate: Scalars['DateTime'];
  symbol: Scalars['String'];
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

export type QueryGetTickerArgs = {
  symbol: Scalars['String'];
};

export type QueryGetTrainedResultArgs = {
  id?: InputMaybe<Scalars['String']>;
  queueId?: InputMaybe<Scalars['String']>;
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

export type QueryMyOrdersArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryMyTrainedResultsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  owner: Scalars['String'];
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

export type QueryNowPaymentsGetStatusArgs = {
  id: Scalars['String'];
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

export type QueryPushNotificationGetArgs = {
  id: Scalars['String'];
  owner?: InputMaybe<Scalars['String']>;
};

export type QueryPushNotificationPaginationArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
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

export type QuerySearchAdListingPublicArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  env?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryStartTrainingArgs = {
  args: RunTrain;
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

export type RunTrain = {
  capital?: InputMaybe<Scalars['Float']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  symbol: Scalars['String'];
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
  adCount?: Maybe<Scalars['Float']>;
  feePrices: FeePrices;
  id: Scalars['String'];
  userCount?: Maybe<Scalars['Float']>;
  vendorBond: Scalars['Float'];
  vendorCount?: Maybe<Scalars['Float']>;
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
  onTrainedResults: TrainedResults;
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

export type SubscriptionOnTrainedResultsArgs = {
  owner?: InputMaybe<Scalars['String']>;
  queueId: Scalars['String'];
};

export type TickerData = {
  __typename?: 'TickerData';
  description?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  industry?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  market?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

export type TimezoneType = {
  __typename?: 'TimezoneType';
  abbreviation?: Maybe<Scalars['String']>;
  gmtOffset?: Maybe<Scalars['Float']>;
  gmtOffsetName?: Maybe<Scalars['String']>;
  tzName?: Maybe<Scalars['String']>;
  zoneName?: Maybe<Scalars['String']>;
};

export type TrainedData = {
  __typename?: 'TrainedData';
  algoMode?: Maybe<Scalars['String']>;
  algoVersion?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  minutesHeld?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  profit?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['DateTime']>;
  symbol?: Maybe<Scalars['String']>;
  zoneName?: Maybe<Scalars['Float']>;
};

export type TrainedResults = {
  __typename?: 'TrainedResults';
  capital?: Maybe<Scalars['Float']>;
  days?: Maybe<Array<Scalars['DateTime']>>;
  endDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  profit?: Maybe<Scalars['Float']>;
  queueId?: Maybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  symbol: Scalars['String'];
  totalTrades?: Maybe<Scalars['Float']>;
  trades?: Maybe<Array<TrainedTrade>>;
  trained?: Maybe<Array<TrainedData>>;
};

export type TrainedResultsPagination = {
  __typename?: 'TrainedResultsPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<TrainedResults>>;
  params?: Maybe<Scalars['JSON']>;
};

export type TrainedTrade = {
  __typename?: 'TrainedTrade';
  entryPrice?: Maybe<Scalars['Float']>;
  entryTime?: Maybe<Scalars['DateTime']>;
  exitTime?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  profit?: Maybe<Scalars['Float']>;
  profitAmount?: Maybe<Scalars['Float']>;
  profitPct?: Maybe<Scalars['Float']>;
  tradeType?: Maybe<Scalars['String']>;
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

export type TrendingSymbols = {
  __typename?: 'TrendingSymbols';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
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

export type PushNotificationPagination = {
  __typename?: 'pushNotificationPagination';
  hasNext?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<PushNotification>>;
  params?: Maybe<Scalars['JSON']>;
};

export type PushNotificationResType = {
  __typename?: 'pushNotificationResType';
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
