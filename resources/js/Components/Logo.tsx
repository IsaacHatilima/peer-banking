import { Tenant } from '@/types/tenant';
import { usePage } from '@inertiajs/react';
import { FcMoneyTransfer } from 'react-icons/fc';

const Logo = () => {
    const tenant: Tenant = usePage().props.tenant;
    return (
        <div className="flex w-full flex-col items-center justify-between">
            <FcMoneyTransfer size={100} />
            <h1 className="mt-2 text-lg font-bold">{tenant?.name}</h1>
            <p className="text-gray-400">Peer Banking</p>
        </div>
    );
};

export default Logo;
