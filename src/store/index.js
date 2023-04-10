import { defineStore } from 'pinia'

export const useFormStore = defineStore('form',{
  state: () => ({
    plansOptions: [
      {
        title: 'Arcade',
        monthPrice: 9,
        yearPrice: 90,
        icon: 'arcade',
        id: 'arcade',
      },
      {
        title: 'Advanced',
        monthPrice: 12,
        yearPrice: 120,
        icon: 'advanced',
        id: 'advanced',
      },
      {
        title: 'Pro',
        monthPrice: 15,
        yearPrice: 150,
        icon: 'pro',
        id: 'pro',
      }
    ],
    addOnsOptions: [
      {
        id: 'service',
        title: 'Online service',
        description: 'Access to multiplayer games',
        monthPrice: 1,
        yearPrice: 10
      },
      {
        id: 'storage',
        title: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        monthPrice: 2,
        yearPrice: 20
      },
      {
        id: 'profile',
        title: 'Customizable profile',
        description: 'Custom theme on your profile',
        monthPrice: 2,
        yearPrice: 20
      }
    ]
  })
})
