import React from "react"
import ContentLoader from "react-content-loader"

const AvatarLoader = (props) => (
    <ContentLoader
        speed={2}
        width={60}
        height={48}
        viewBox="0 0 60 48"
        backgroundColor="#fff"
        foregroundColor="#000"
        {...props}
    >
        <rect x="564" y="119" rx="3" ry="3" width="88" height="6" />
        <rect x="555" y="123" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <rect x="553" y="119" rx="0" ry="0" width="152" height="6" />
        <rect x="57" y="99" rx="0" ry="0" width="46" height="37" />
        <rect x="561" y="113" rx="0" ry="0" width="42" height="40" />
        <circle cx="594" cy="125" r="31" />
        <circle cx="581" cy="125" r="5" />
        <circle cx="535" cy="165" r="54" />
        <circle cx="585" cy="131" r="14" />
        <circle cx="580" cy="122" r="10" />
        <circle cx="37" cy="38" r="2" />
        <circle cx="24" cy="24" r="24" />
    </ContentLoader>
)

export { AvatarLoader }