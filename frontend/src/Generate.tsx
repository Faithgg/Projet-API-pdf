import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


import MenuComponent from './Menu'

  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

export default function Generate() {
    const [articleName, setArticleName] = useState("")
    const [articlePrice, setArticlePrice] = useState("")
    
    let types = [
        {
          id: 1,
          type: 'Facture',
          avatar:
            'https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126884_1280.png',
        },
        {
            id: 2,
            type: 'Devis',
            avatar:
              'https://cdn.pixabay.com/photo/2016/08/26/15/54/checklist-1622517_1280.png',
          }
      ]
    
    const [selectedType, setSelectedType] = useState(types[0])

    
    const createAndDownloadPdf = () => {
        fetch('http://localhost:3000/add',
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            type : selectedType.type,
            name : articleName,
            price : articlePrice
          }),
        })
          .then(() =>fetch('http://localhost:3000/getPdf'))
          .then(res=> res.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            
          })
      }
    
       return (
       <>
        <MenuComponent/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Article
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="name"
                  required
                  value={articleName}
                  onChange={(e) => setArticleName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="articlePrice" className="block text-sm font-medium leading-6 text-gray-900">
                  Prix
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="articlePrice"
                  name="prenom"
                  type="text"
                  autoComplete="articlePrice"
                  required
                  value={articlePrice}
                  onChange={(e) => setArticlePrice(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

               <Listbox value={selectedType} onChange={setSelectedType}>
                {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    Chosissez le type de document à générer.
                    </Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                            <img src={selectedType.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                            <span className="ml-3 block truncate">{selectedType.type}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                        </Listbox.Button>

                        <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {types.map((proposition) => (
                            <Listbox.Option
                                key={proposition.id}
                                className={({ active }) =>
                                classNames(
                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                                }
                                value={proposition}>
                                {({ selected, active }) => (
                                <>
                                    <div className="flex items-center">
                                    <img src={proposition.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                    <span
                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                    >
                                        {proposition.type}
                                    </span>
                                    </div>

                                    {selectedType ? (
                                    <span
                                        className={classNames(
                                        active ? 'text-white' : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                        )}
                                    >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    ) : null}
                                </>
                                )}
                            </Listbox.Option>
                            ))}
                        </Listbox.Options>
                        </Transition>
                    </div>
                </>
      )}
                </Listbox>

    <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="rounded-md text-sm  px-3 py-2 font-semibold text-white bg-red-600 shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-60" onClick={()=> window.history.back()}>
            Annuler
          </button>

          <button
            type="submit"
            onClick={createAndDownloadPdf}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Soumettre
          </button>

    </div>
    </div>
          </div>
      </>)
   
    }
  

    