import { DatePicker } from '@/components/ui/DatePicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const Launch = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col pt-24 text-blue-300">
      <div>
        <p>
          Schedule a mission launch for interstellar travel to one of the Kepler
          Exoplanet
        </p>
        <p>
          Only confirmed planets matching the following criteria are available
          for the earliest scheduled missions:
        </p>
      </div>

      <div>
        <ol>Planets radius 1.6 times earth radius</ol>
        <ol>
          Effective stellar flux 0.36 times earth's value and 1.11 times of
          earth's value
        </ol>
      </div>

      <div>
        <div>
          <Label htmlFor="title">Launch Date</Label>
          <DatePicker />
        </div>
        <div>
          <Label htmlFor="title">Mission Name</Label>
          <Input />
        </div>
        <div>
          <Label htmlFor="title">Rocket Type</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select rocket" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Rocket 1</SelectItem>
              <SelectItem value="dark">Rocket 2</SelectItem>
              <SelectItem value="dark">Rocket 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="title">Destination Exoplanet</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select planet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Rocket 1</SelectItem>
              <SelectItem value="dark">Rocket 2</SelectItem>
              <SelectItem value="dark">Rocket 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default Launch
