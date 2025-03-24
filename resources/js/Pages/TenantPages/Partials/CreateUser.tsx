import UserForm from '@/Pages/TenantPages/Partials/UserForm';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function CreateUser() {
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
                    buttonLabel="Create"
                    createTenantModalManager={createTenantModalManager}
                />
            </Modal>

            <Button
                variant="filled"
                color="black"
                onClick={() => {
                    createTenantModalManager.open();
                }}
            >
                Create User
            </Button>
        </>
    );
}

export default CreateUser;
