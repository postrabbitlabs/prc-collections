
import {PrcConfigProvider} from "@/remocollab/prc-base/PrcConfigProvider.tsx";
import {useRoutes} from "react-router-dom";
import routes from "~react-pages";
import {Suspense} from "react";
const App = () => {

  return (
    <PrcConfigProvider>
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
    </PrcConfigProvider>
  );
};

export default App;
