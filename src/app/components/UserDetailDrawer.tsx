import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, EnvelopeIcon, PhoneIcon, HomeIcon } from '@heroicons/react/24/outline'
import { User } from '@/app/utils/mockData'

interface UserDetailDrawerProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onUpdate?: (updatedUser: User) => void
  onDelete?: (userId: string) => void
}

export default function UserDetailDrawer({ 
  user, 
  isOpen, 
  onClose,
  onUpdate,
  onDelete 
}: UserDetailDrawerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!user) return null

  const handleEdit = () => {
    setEditedUser(user)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedUser && onUpdate) {
      onUpdate(editedUser)
    }
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (onDelete && user.id) {
      onDelete(user.id)
      onClose()
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-b border-gray-200">
                  <div className="flex items-center justify-between px-4 py-4">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                      {isEditing ? 'Edit User' : 'User Details'}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      onClick={onClose}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="px-4 py-6">
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-gray-900 border-b pb-2">
                            Basic Information
                          </h4>
                          
                          <div className="space-y-5">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                                Full Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                value={editedUser?.name || ''}
                                onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900 placeholder:text-gray-400"
                                placeholder="Enter full name"
                              />
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                                Email Address
                              </label>
                              <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                  type="email"
                                  id="email"
                                  value={editedUser?.email || ''}
                                  onChange={(e) => setEditedUser(prev => prev ? {...prev, email: e.target.value} : null)}
                                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900 placeholder:text-gray-400"
                                  placeholder="user@example.com"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1">
                                Phone Number
                              </label>
                              <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <PhoneIcon className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                  type="tel"
                                  id="phone"
                                  value={editedUser?.phoneNumber || ''}
                                  onChange={(e) => setEditedUser(prev => prev ? {...prev, phoneNumber: e.target.value} : null)}
                                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900 placeholder:text-gray-400"
                                  placeholder="+1 (555) 000-0000"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-gray-900 border-b pb-2">
                            Role & Status
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-5">
                            <div>
                              <label htmlFor="role" className="block text-sm font-medium text-gray-900 mb-1">
                                Role
                              </label>
                              <select
                                id="role"
                                value={editedUser?.role || ''}
                                onChange={(e) => setEditedUser(prev => prev ? {...prev, role: e.target.value as User['role']} : null)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900 bg-white"
                              >
                                <option value="Admin">Admin</option>
                                <option value="Agent">Agent</option>
                                <option value="Manager">Manager</option>
                                <option value="Staff">Staff</option>
                              </select>
                            </div>

                            <div>
                              <label htmlFor="status" className="block text-sm font-medium text-gray-900 mb-1">
                                Status
                              </label>
                              <select
                                id="status"
                                value={editedUser?.status || ''}
                                onChange={(e) => setEditedUser(prev => prev ? {...prev, status: e.target.value as User['status']} : null)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900 bg-white"
                              >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-lg font-medium text-white">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <div className="rounded-lg bg-gray-50 p-4 space-y-2">
                            <div className="flex items-center space-x-2">
                              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                              <span className="text-sm text-gray-600">{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <PhoneIcon className="h-5 w-5 text-gray-400" />
                              <span className="text-sm text-gray-600">{user.phoneNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <HomeIcon className="h-5 w-5 text-gray-400" />
                              <span className="text-sm text-gray-600">{user.properties} Properties</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-sm font-medium text-gray-500">Role</span>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-sm font-medium text-gray-500">Status</span>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4">
                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSave}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(true)}
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Delete User
                        </button>
                        <button
                          type="button"
                          onClick={handleEdit}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Edit User
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Delete Confirmation Dialog */}
                {showDeleteConfirm && (
                  <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <div className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:text-left">
                            <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete this user? This action cannot be undone.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="button"
                            onClick={handleDelete}
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(false)}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function getRoleColor(role: string) {
  switch (role) {
    case 'Admin':
      return 'bg-purple-100 text-purple-800'
    case 'Agent':
      return 'bg-blue-100 text-blue-800'
    case 'Manager':
      return 'bg-yellow-100 text-yellow-800'
    case 'Staff':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Inactive':
      return 'bg-gray-100 text-gray-800'
    case 'Suspended':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
} 