import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: null,
    ChangeUser: (newUser) => set({user: newUser}),
    payments:[],
    setPayments:(payments) => set({payments:payments}),
    reserva: {},
    setReserva:(newReserva)=>set({reserva:newReserva}),
    isDrawerOpen: false,
    toggleDrawer: () => set((state)=>{isDrawerOpen: !state.isDrawerOpen}),
    history:[],
    setHistory:(history) => set({history:history}),
    vehicles:[],
    setVehicles: (newVehicle) => set({vehicles:newVehicle}),
    removeVehicle: (vehicle) => {
        set((state) => ({
            vehicles: state.vehicles.filter((v) => v.id !== vehicle.id)
        }));
    },
}));
