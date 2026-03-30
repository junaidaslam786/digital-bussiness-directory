import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BusinessOwner } from "@/types";
import { User, Briefcase, Mail } from "lucide-react";
import Image from "next/image";

interface OwnerInfoProps {
  owner: BusinessOwner;
}

export function OwnerInfo({ owner }: OwnerInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <span>Leadership</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Owner Photo */}
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-700">
            {owner.avatarUrl ? (
              <Image
                src={owner.avatarUrl}
                alt={owner.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                <User className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>

          {/* Owner Name */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {owner.name}
            </h3>
          </div>

          {/* Contact Links */}
          {owner.email && (
            <div className="flex space-x-3 pt-2">
              <a
                href={`mailto:${owner.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                title="Send Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
