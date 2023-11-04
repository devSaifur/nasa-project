import { getPlanets } from '@/api/getPlanets'
import { DatePicker } from '@/components/ui/DatePicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'

const Launch = () => {
  const [planets, setPlanets] = useState([])

  useEffect(() => {
    const planets = async () => await getPlanets()
    planets().then((res) => setPlanets(res))
  }, [])

  console.log(planets)

  console.log(planets)

  return (
    <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-4 border-2 border-primary px-4 py-8 text-lg">
      <div className="space-y-4">
        <h1 className="font-bold">
          Schedule a mission launch for interstellar travel to one of the Kepler
          Exoplanets
        </h1>
        <p>
          Only confirmed planets matching the following criteria are available
          for the earliest scheduled missions:
        </p>
      </div>

      <div className="space-y-2 pl-8">
        <ol>* Planets radius &lt; 1.6 times earth radius.</ol>
        <ol>
          * Effective stellar flux &gt; 0.36 times earth's value and &lt; 1.11
          times of earth's value.
        </ol>
      </div>

      <div className="flex max-w-lg flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label className="text-xl" htmlFor="title">
            Launch Date:
          </Label>

          <DatePicker />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-xl" htmlFor="title">
            Mission Name:
          </Label>
          <Input className="max-w-[240px]" />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-xl" htmlFor="title">
            Rocket Type:
          </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select rocket" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Explorer IS1</SelectItem>
              <SelectItem value="dark">Rocket 2</SelectItem>
              <SelectItem value="dark">Rocket 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-xl" htmlFor="title">
            Destination Exoplanet:
          </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select planet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Explorer IS1</SelectItem>
              <SelectItem value="dark">Rocket 2</SelectItem>
              <SelectItem value="dark">Rocket 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        className="w-56 border-green-400 font-semibold text-green-400 hover:bg-green-400"
        size="lg"
        variant="outline"
      >
        Launch Mission
      </Button>
    </div>
  )
}

export default Launch
