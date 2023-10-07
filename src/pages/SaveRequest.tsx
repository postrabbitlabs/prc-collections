// import CollectionMenus from "@/libs/Menus";
// import CollectionsSaveRequest from "@/libs/SaveRequest.tsx";
import { Button } from 'antd';
import { useState } from 'react';

import SaveRequestModal from '@/libs/SaveRequest.tsx';
import treeData from '@/mock.json';

const SaveRequestPage = () => {
  const [open, setOpen] = useState(true);
  // const { t } = useTranslation();
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Save As
      </Button>
      {/*treeData是postman类型，需要转一下*/}
      <SaveRequestModal
        locale={'cn'}
        treeData={treeData}
        open={open}
        requestName={''}
        onCreateFolder={() => {}}
        onSave={(data) => {}}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default SaveRequestPage;
