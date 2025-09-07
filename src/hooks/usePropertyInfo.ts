import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PropertyData {
    id: string
    name: string
    address: string
}

interface PropertyStore {
    property: PropertyData | null
    setProperty: (property: PropertyData) => void
    updateProperty: (property: Partial<PropertyData> & { id: string }) => void
    clearProperty: () => void
}

export const usePropertyStore = create<PropertyStore>()(
    persist(
        (set, get) => ({
            property: null,

            setProperty: (property: PropertyData) => {
                set({ property })
            },

            updateProperty: (newProperty: Partial<PropertyData> & { id: string }) => {
                const currentProperty = get().property

                // Only update if the ID is different or if no property exists
                if (!currentProperty || currentProperty.id !== newProperty.id) {
                    set({
                        property: {
                            id: newProperty.id,
                            name: newProperty.name || '',
                            address: newProperty.address || ''
                        }
                    })
                }
            },

            clearProperty: () => {
                set({ property: null })
            }
        }),
        {
            name: 'property-storage', // localStorage key
            partialize: (state) => ({ property: state.property }), // Only persist the property data
        }
    )
)