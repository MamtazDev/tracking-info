import { create } from 'zustand';

interface ContactInfo {
  loadId: string;
  driverName: string;
  driverPhone: string;
  brokerName?: string;
  brokerPhone?: string;
  carrierName?: string;
  carrierPhone?: string;
}

interface Location {
  id: number;
  pickuplocation: string;
  dropOfflocation: string;
  pickupDate: { from: Date | null; to: Date | null };
  dropOffDate: { from: Date | null; to: Date | null };
  pickupTime: string;
  dropOffTime: string;
  actualPickupDate: Date;
  actualDropOffDate: Date;
  actualPickupTime: string;
  actualDropOffTime: string;
}

interface TrackingInfo {
  contactInfo: ContactInfo;
  pickupLocations: Location[];
  dropoffLocations: Location[];
  status: 'draft' | 'publish';
}

interface StoreState {
  trackingInfo: TrackingInfo[];
  isOpen: boolean;
  loadId: string;
  openModal: () => void;
  closeModal: () => void;
  deleteTrackingInfo: (loadId: string) => void;
  addLocation: (loadId: string, location: Location, type: 'pickup' | 'dropoff') => void;
  removeLocation: (loadId: string, locationId: number, type: 'pickup' | 'dropoff') => void;
  updateLocation: (loadId: string, updatedLocations: Location[], type: 'pickup' | 'dropoff') => void;
  addContactInfo: (newInfo: ContactInfo) => void;
  updateContactInfo: (updatedInfo: ContactInfo) => void;
  deleteContactInfo: (loadId: string) => void;
  setEditableContactInfo: (loadId: string) => void;
  recordBeingEdited: string;
  setRecordBeingEdited: (load: string) => void;
  editableContactInfo: ContactInfo | null;
  viewTrackingInfo: (loadId: string) => TrackingInfo | undefined;  
  setLoadId: (loadId: string) => void;
  updateStatus: (loadId: string, status: 'draft' | 'publish') => void; // Add updateStatus method
}

const useStore = create<StoreState>((set, get) => ({
  trackingInfo: [],
  isOpen: false,
  loadId: '',
  recordBeingEdited: '',
  editableContactInfo: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setRecordBeingEdited: (recordId) => set({ recordBeingEdited: recordId }),
  setLoadId: (loadId) => set({ loadId }),

  setEditableContactInfo: (loadId) => {
    const state = get();
    const contactInfo = state.trackingInfo.find(info => info.contactInfo.loadId === loadId)?.contactInfo || null;
    set({ editableContactInfo: contactInfo });
  },

  addContactInfo: (newInfo) => set((state) => {
    const existingInfo = state.trackingInfo.find((info) => info.contactInfo.loadId === newInfo.loadId);

    if (existingInfo) {
      return {
        trackingInfo: state.trackingInfo.map((info) =>
          info.contactInfo.loadId === newInfo.loadId ? { ...info, contactInfo: newInfo } : info
        ),
      };
    }
    return {
      trackingInfo: [
        ...state.trackingInfo,
        { contactInfo: newInfo, pickupLocations: [], dropoffLocations: [], status: 'draft' }, // Initialize status to 'draft'
      ],
    };
  }),
  
  deleteTrackingInfo: (loadId) => set((state) => ({
    trackingInfo: state.trackingInfo.filter((info) => info.contactInfo.loadId !== loadId),
  })),

  updateContactInfo: (updatedInfo) => set((state) => ({
    trackingInfo: state.trackingInfo.map((info) =>
      info.contactInfo.loadId === updatedInfo.loadId ? { ...info, contactInfo: updatedInfo } : info
    ),
  })),

  deleteContactInfo: (loadId) => set((state) => ({
    trackingInfo: state.trackingInfo.filter((info) => info.contactInfo.loadId !== loadId),
  })),

  addLocation: (loadId, location, type) => set((state) => ({
    trackingInfo: state.trackingInfo.map((info) =>
      info.contactInfo.loadId === loadId
        ? {
            ...info,
            [type === 'pickup' ? 'pickupLocations' : 'dropoffLocations']: [
              ...info[type === 'pickup' ? 'pickupLocations' : 'dropoffLocations'],
              location,
            ],
          }
        : info
    ),
  })),

  removeLocation: (loadId, locationId, type) => set((state) => ({
    trackingInfo: state.trackingInfo.map((info) =>
      info.contactInfo.loadId === loadId
        ? {
            ...info,
            [type === 'pickup' ? 'pickupLocations' : 'dropoffLocations']: info[
              type === 'pickup' ? 'pickupLocations' : 'dropoffLocations'
            ].filter((loc) => loc.id !== locationId),
          }
        : info
    ),
  })),

  updateLocation: (loadId, updatedLocations, type) => set((state) => ({
    trackingInfo: state.trackingInfo.map((info) =>
      info.contactInfo.loadId === loadId
        ? {
            ...info,
            [type === 'pickup' ? 'pickupLocations' : 'dropoffLocations']: updatedLocations,
          }
        : info
    ),
  })),

  updateStatus: (loadId, status) => set((state) => ({
    trackingInfo: state.trackingInfo.map((info) =>
      info.contactInfo.loadId === loadId
        ? { ...info, status }
        : info
    ),
  })), // Add updateStatus method

  viewTrackingInfo: (loadId) => {
    const state = get();
    return state.trackingInfo.find((info) => info.contactInfo.loadId === loadId);
  },
}));

export default useStore;