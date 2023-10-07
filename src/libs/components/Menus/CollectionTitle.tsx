// import { ItemType, RequestMethods } from '../../token.ts';
// import RequestItemDisplay from '../../widgets/RequestItemDisplay.tsx';

import RequestItemDisplay from "@/libs/widgets/RequestItemDisplay.tsx";
import { ItemType, RequestMethods } from "@/remocollab/prc-base/token.ts";

function CollectionTitle({data}) {
  const item = data
  return (
    <div>
      <RequestItemDisplay
        itemType={item.request ? ItemType.REQUEST : ItemType.FOLDER}
        name={item.name}
        request={{
          method: item.request?.method || RequestMethods.PATCH,
          header: item.request?.header,
        }}
      />
    </div>
  );
}

export default CollectionTitle;
