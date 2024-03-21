import type { AlertBannerProps } from '@uuixjs/uuixweb';
import { AlertBanner, AlertBannerType } from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';

export interface AlertProps extends AlertBannerProps {
  children?: React.ReactNode;
}

export const Alert = ({ children, ...props }: AlertProps) => {
  const {
    type = AlertBannerType.Info,
    status = '',
    message = '',
    link,
    actions,
    ...otherProps
  } = props;

  if (isEmpty(message)) return undefined;

  // return (
  //   <AlertBanner
  //     type={AlertBannerType.Info}
  //     status="A very short string."
  //     message="Description with only a few words."
  //     // closeButton={{
  //     //   "aria-label": "Close Modal",
  //     //   onClick: () => alert("Closed Modal"),
  //     // }}
  //     // actions={[
  //     //   { children: "First CTA Button" },
  //     //   { children: "Second CTA Button" },
  //     // ]}
  //   />
  // );

  return (
    <AlertBanner
      type={type}
      status={status}
      message={message}
      link={link}
      actions={actions}
      {...otherProps}
    />
  );
};
