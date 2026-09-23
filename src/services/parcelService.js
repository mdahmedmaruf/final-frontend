import { apiRequest } from './api'

export const parcelService = {
    getAllParcels: () => apiRequest('/api/parcels'),

    createParcel: (data) =>
        apiRequest('/api/parcels', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    approveParcel: (parcelId) =>
        apiRequest(`/api/parcels/${parcelId}/approve`, {
            method: 'PUT',
        }),

    assignRider: (parcelId, riderId) =>
        apiRequest(`/api/parcels/${parcelId}/assign`, {
            method: 'PUT',
            body: JSON.stringify({ rider_id: riderId }),
        }),

    updateStatus: (parcelId, status) =>
        apiRequest(`/api/parcels/${parcelId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }),
}
