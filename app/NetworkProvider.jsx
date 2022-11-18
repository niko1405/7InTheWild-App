import { useNetInfo } from "@react-native-community/netinfo";

import NetworkError from "./components/NetworkError";

const NetworkProvider = ({ children }) => {
  const netinfo = useNetInfo();

  if (!netinfo.isConnected || !netinfo.isInternetReachable) {
    return <NetworkError />;
  }

  return <>{children}</>;
};

export default NetworkProvider;
