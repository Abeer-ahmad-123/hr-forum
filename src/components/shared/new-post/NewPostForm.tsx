//@ts-nocheck
import { useState } from 'react';
import { CiImageOn as ImageIcon } from 'react-icons/ci';
import { AiOutlineLink as LinkIcon } from 'react-icons/ai';
import { IoDocumentAttachOutline as AttachmentIcon } from 'react-icons/io5';
import { Editor } from '../editor';
import Dropdown from './Dropdown';
import { postCreatePostInChannel } from '@/services/posts';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper';

export default function NewPostForm({open}) {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    channelId: '',
  });

  const [loading, setLoading] = useState(false);

  const isDisabled = !formValues.channelId || !formValues.title || loading;

  const handleEditorContentChange = (content: any) => {
    setFormValues({ ...formValues, content });
  };

  const handleDropDownValue = (value: any) => {
    setFormValues({ ...formValues, ['channelId']: value });
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const createPost = async () => {
    try {
      setLoading(true);

      const { channelId, ...body } = formValues;
      console.log("Data that we are passing...", channelId, body);
      const result = await postCreatePostInChannel({ channelID: channelId, body });
      console.log('result 46', result);

      if (result?.success) {
        showSuccessAlert('Post created successfully');
      }
      else{
        showErrorAlert(result.errors[0]);
      }
    } catch (err) {
      console.log('err', err);
      showErrorAlert("Something went wrong while creating post");
    } finally {
      setLoading(false);
      // open(false);

    }
  };

  return (
    <div className="flex flex-col space-y-6 rounded-xl bg-white p-2 dark:bg-dark-background">
      <div className="flex w-full justify-between">
        <h3 className="w-content mb-4 flex-shrink-0 text-xl font-medium text-gray-700 dark:text-white">
          Ask for help from the community...
        </h3>
        <Dropdown
          value={formValues.channelId}
          onSelect={handleFormChange}
          handleDropDownValue={handleDropDownValue}
        />
      </div>

      <input
        className="mb-3 w-full rounded-lg p-2 text-xl placeholder-gray-500 ring-1 ring-gray-300 transition duration-200 ease-in-out focus:outline-none focus:ring-blue-300 dark:bg-dark-primary dark:text-white dark:placeholder-white"
        type="text"
        placeholder="Add a title"
        name="title"
        onChange={handleFormChange}
        value={formValues.title}
      />

      <div className=" ">
        <Editor value={formValues.content} onContentChange={handleEditorContentChange} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <AttachmentIcon className="h-6 w-6 text-gray-700 transition duration-200 hover:text-blue-500" />
          <ImageIcon className="h-6 w-6 text-gray-700 transition duration-200 hover:text-blue-500" />
          <LinkIcon className="h-6 w-6 text-gray-700 transition duration-200 hover:text-blue-500" />
        </div>
        <button
          onClick={createPost}
          disabled={isDisabled}
          className={`rounded-md ${isDisabled ? 'bg-stone-200' : 'bg-blue-500'} p-2 text-white transition duration-200 hover:${
            isDisabled ? 'bg-stone-200' : 'bg-blue-600'
          }`}>
          {loading ? 'Loading...' : 'Next'}
        </button>
      </div>
    </div>
  );
}
