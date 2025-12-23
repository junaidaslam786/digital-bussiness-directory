import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { OwnerInfo as OwnerInfoType } from "@/types";
import { User, Briefcase, Mail, Linkedin } from "lucide-react";
import Image from "next/image";

interface OwnerInfoProps {
  owner: OwnerInfoType;
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
            {owner.photo ? (
              <Image
                src={owner.photo}
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

          {/* Owner Name & Title */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {owner.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {owner.title}
            </p>
          </div>

          {/* Bio */}
          {owner.bio && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {owner.bio}
            </p>
          )}

          {/* Contact Links */}
          {(owner.email || owner.linkedin) && (
            <div className="flex space-x-3 pt-2">
              {owner.email && (
                <a
                  href={`mailto:${owner.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  title="Send Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
              {owner.linkedin && (
                <a
                  href={owner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
