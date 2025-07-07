import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function BookCard({ book }) {
  return (
    <Card className="w-72 m-4 shadow-lg transition hover:scale-105">
      <CardHeader className="flex flex-col items-center">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-32 h-48 object-coverImage rounded"
        />
        <h3 className="text-lg font-bold mt-2">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mt-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
            {book.category}
          </span>
          <span className="text-xs text-gray-400">{book.pages} pages</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span
            className={`text-xs px-2 py-1 rounded ${
              book.status === "finished"
                ? "bg-green-100 text-green-700"
                : book.status === "reading"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {book.status === "to read"
              ? "À lire"
              : book.status === "reading"
              ? "En cours"
              : "Terminé"}
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Détails
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h4 className="font-bold">{book.title}</h4>
              <p>Auteur : {book.author}</p>
              <p>Catégorie : {book.category}</p>
              <p>Pages : {book.pages}</p>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
