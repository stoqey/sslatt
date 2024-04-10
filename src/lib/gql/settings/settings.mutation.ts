import gql from 'graphql-tag';

export const UPDATE_SITE_SETTINGS_ADMIN = gql`
  mutation UpdateSiteSettings($args: SiteSettingsInput!) {
    data: updateSiteSettings(args: $args) {
      data
      success
      message
    }
  }
`;
