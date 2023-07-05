import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: null,
    ChangeUser: (newUser) => set({user: newUser}),
    payments:[],
    setPayments:(payments) => set({payments:payments}),
    isDrawerOpen: false,
    toggleDrawer: () => set((state)=>{isDrawerOpen: !state.isDrawerOpen}),
    history:[{data:'13/12/2011', entrada: 'entrada', saida:'saida', veiculo: 'onix', valor:'12.23'}],
    setHistory:(history) => set({history:history}),
    vehicles:[],
    setVehicles: (newVehicle) => set({vehicles:newVehicle}),
    removeVehicle: (vehicle) => {
        set((state) => ({
            vehicles: state.vehicles.filter((v) => v.id !== vehicle.id)
        }));
    },
    reservas: [],
    setReservas: (newReservas) => set({reservas:newReservas})
}));
