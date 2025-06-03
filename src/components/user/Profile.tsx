import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/reducers/store';
import { fetchUserProfile, updateUserProfile, updateUserAddress } from '../../store/actions/user';
import { useForm } from 'react-hook-form';
import type { UpdateProfileRequest, UpdateAddressRequest } from '../../store/types/user';
import toast from 'react-hot-toast';
import InputField from '../shared/InputField';
import SubmitBtn from '../shared/SubmitBtn';

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile } = useSelector((state: RootState) => state.userState);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        formState: { errors: profileErrors }
    } = useForm<UpdateProfileRequest>();

    const {
        register: registerAddress,
        handleSubmit: handleAddressSubmit,
        formState: { errors: addressErrors }
    } = useForm<UpdateAddressRequest>();

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const onProfileSubmit = async (data: UpdateProfileRequest) => {
        const result = await dispatch(updateUserProfile(data));
        if (updateUserProfile.fulfilled.match(result)) {
            toast.success('Perfil atualizado com sucesso!');
            setIsEditingProfile(false);
        } else {
            toast.error('Erro ao atualizar perfil');
        }
    };

    const onAddressSubmit = async (data: UpdateAddressRequest) => {
        const result = await dispatch(updateUserAddress(data));
        if (updateUserAddress.fulfilled.match(result)) {
            toast.success('Endereço atualizado com sucesso!');
            setIsEditingAddress(false);
        } else {
            toast.error('Erro ao atualizar endereço');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Meu Perfil</h1>

            {/* Profile Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Informações Pessoais</h2>
                    <button
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="text-red-600 hover:text-red-800"
                    >
                        {isEditingProfile ? 'Cancelar' : 'Editar'}
                    </button>
                </div>

                {isEditingProfile ? (
                    <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                        <InputField
                            label="Nome"
                            id="username"
                            register={registerProfile}
                            errors={profileErrors}
                            required
                            value={profile?.username ?? ""}
                            message="Nome é obrigatório"
                            placeholder="Digite o nome"
                            type="text"
                        />
                        <InputField
                            label="Email"
                            id="email"
                            register={registerProfile}
                            errors={profileErrors}
                            required
                            value={profile?.email ?? ""}
                            message="Email é obrigatório"
                            placeholder="Digite o email"
                            type="email"
                        />
                        <InputField
                            label="Senha Atual"
                            id="currentPassword"
                            register={registerProfile}
                            errors={profileErrors}
                            type="password"
                            placeholder="Digite para alterar a senha"
                            value={""}
                            required={false}
                            message=""
                        />
                        <InputField
                            label="Nova Senha"
                            id="newPassword"
                            register={registerProfile}
                            errors={profileErrors}
                            type="password"
                            placeholder="Digite a nova senha"
                            required={false}
                            message=""
                            value={""}
                        />
                        <SubmitBtn text="Salvar Alterações" />
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome</label>
                            <p className="mt-1">{profile?.username}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1">{profile?.email}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Address Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Endereço</h2>
                    <button
                        onClick={() => setIsEditingAddress(!isEditingAddress)}
                        className="text-red-600 hover:text-red-800"
                    >
                        {isEditingAddress ? 'Cancelar' : 'Editar'}
                    </button>
                </div>

                {isEditingAddress ? (
                    <form onSubmit={handleAddressSubmit(onAddressSubmit)} className="space-y-4">
                        <InputField
                            label="CEP"
                            id="zipCode"
                            register={registerAddress}
                            errors={addressErrors}
                            required
                            value={profile?.address?.zipCode ?? ""}
                            message="CEP é obrigatório"
                            placeholder="Digite o CEP"
                            type="text"
                        />
                        <InputField
                            label="Rua"
                            id="street"
                            register={registerAddress}
                            errors={addressErrors}
                            required
                            value={profile?.address?.street ?? ""}  
                            message="Rua é obrigatória"
                            placeholder="Digite a rua"
                            type="text"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="Número"
                                id="number"
                                register={registerAddress}
                                errors={addressErrors}
                                required
                                value={profile?.address?.number ?? ""}  
                                message="Número é obrigatório"
                                placeholder="Digite o número"
                                type="text"
                            />
                            <InputField
                                label="Complemento"
                                id="complement"
                                register={registerAddress}
                                errors={addressErrors}
                                value={profile?.address?.complement ?? ""}
                                message="Complemento é obrigatório"
                                placeholder="Digite o complemento"
                                type="text"
                                required={false}
                            />
                        </div>
                        <InputField
                            label="Bairro"
                            id="neighborhood"
                            register={registerAddress}
                            errors={addressErrors}
                            required
                            value={profile?.address?.neighborhood ?? ""}  
                            message="Bairro é obrigatório"
                            placeholder="Digite o bairro"
                            type="text"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="Cidade"
                                id="city"
                                register={registerAddress}
                                errors={addressErrors}
                                required
                                value={profile?.address?.city ?? ""}  
                                message="Cidade é obrigatória"
                                placeholder="Digite a cidade"
                                type="text"
                            />
                            <InputField
                                label="Estado"
                                id="state"
                                register={registerAddress}
                                errors={addressErrors}
                                required
                                value={profile?.address?.state ?? ""}  
                                message="Estado é obrigatório"
                                placeholder="Digite o estado"
                                type="text"
                            />
                        </div>
                        <SubmitBtn text="Salvar Endereço" />
                    </form>
                ) : (
                    <div className="space-y-4">
                        {profile?.address ? (
                            <>
                                <p>{profile.address.street}, {profile.address.number}</p>
                                {profile.address.complement && (
                                    <p>{profile.address.complement}</p>
                                )}
                                <p>{profile.address.neighborhood}</p>
                                <p>{profile.address.city} - {profile.address.state}</p>
                                <p>{profile.address.zipCode}</p>
                            </>
                        ) : (
                            <p className="text-gray-500">Nenhum endereço cadastrado</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile; 