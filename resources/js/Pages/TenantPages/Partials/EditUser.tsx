import UserForm from '@/Pages/TenantPages/Partials/UserForm';
import { User } from '@/types/user';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function EditUser({ user }: { user: User }) {
    const [openCreateTenantModal, createTenantModalManager] =
        useDisclosure(false);

    return (
        <>
            <Modal
                opened={openCreateTenantModal}
                onClose={() => {
                    createTenantModalManager.close();
                }}
                size="xl"
                title="Create User"
            >
                <UserForm
                    user={user}
                    buttonLabel="Update"
                    createTenantModalManager={createTenantModalManager}
                />
            </Modal>

            <span
                className="cursor-pointer text-sky-600 hover:underline"
                onClick={() => {
                    createTenantModalManager.open();
                }}
            >
                Edit User
            </span>
        </>
    );
}

export default EditUser;
