import { FaRegSave } from 'react-icons/fa';
import { GrDuplicate } from 'react-icons/gr';
import { useParams, useLocation } from 'react-router-dom';

import ActionButtonRow from '../Atoms/ActionButtonRow';

import IconButton from '@/components/Atoms/IconButton';
import useHandleCreate from '@/hooks/useHandleCreate';
import useHandleModify from '@/hooks/useHandleModify';
import { useCreateStore } from '@/store/createStore';

const CreateAction = () => {
  const location = useLocation();
  const { id } = useParams();

  const isEdit = Boolean(id) && location.pathname.includes('edit');

  const title = useCreateStore(state => state.title);
  const description = useCreateStore(state => state.description);
  const questions = useCreateStore(state => state.questions);

  const handleCreate = useHandleCreate({ title, description, questions });

  const handleModify = useHandleModify({
    id: id as string,
    title,
    description,
    questions,
  });

  return isEdit ? (
    <ActionButtonRow>
      <IconButton onClick={e => handleCreate(e, 'duplicate')}>
        <GrDuplicate size={20} />
      </IconButton>
      <IconButton onClick={handleModify}>
        <FaRegSave size={20} />
      </IconButton>
    </ActionButtonRow>
  ) : (
    <ActionButtonRow>
      <IconButton onClick={handleCreate}>
        <FaRegSave size={20} />
      </IconButton>
    </ActionButtonRow>
  );
};

export default CreateAction;
